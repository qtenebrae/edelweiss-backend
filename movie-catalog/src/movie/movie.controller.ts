import {
	Body,
	Controller,
	Delete,
	forwardRef,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Inject,
	Param,
	Post,
	Put,
	UploadedFile,
	UseInterceptors,
	ValidationPipe,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create-movie.dto';
import { DeleteMovieDto } from './dto/delete-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { TypeService } from '../type/type.service';
import { StatusService } from '../status/status.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('movie')
@ApiTags('Movie')
export class MovieController {
	constructor(
		private readonly movieService: MovieService,
		@Inject(forwardRef(() => TypeService)) private readonly typeService: TypeService,
		@Inject(forwardRef(() => StatusService)) private readonly statusService: StatusService,
		@Inject('INTERNAL') private readonly rabbitClient: ClientProxy,
	) {}

	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async create(@Body(new ValidationPipe()) createMovieDto: CreateMovieDto): Promise<Movie> {
		const typeExists = await this.typeService.findById(Number(createMovieDto.typeId));
		if (!typeExists) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		const statusExists = await this.statusService.findById(Number(createMovieDto.statusId));
		if (!statusExists) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		const genres = createMovieDto.genresId?.map((id) => {
			return {
				genre: {
					connect: {
						id,
					},
				},
			};
		});

		const countries = createMovieDto.countriesId?.map((id) => {
			return {
				country: {
					connect: {
						id,
					},
				},
			};
		});

		return this.movieService.create({
			title: createMovieDto.title,
			alternativeTitle: createMovieDto.alternativeTitle,
			release: createMovieDto.release,
			description: createMovieDto.description,
			rating: createMovieDto.rating,
			duration: createMovieDto.duration,
			numberOfEpisodes: createMovieDto.numberOfEpisodes,
			ageLimit: createMovieDto.ageLimit,
			posterUrl: createMovieDto.posterUrl,
			type: {
				connect: { id: Number(createMovieDto.typeId) },
			},
			status: {
				connect: { id: Number(createMovieDto.statusId) },
			},
			genres: {
				create: genres,
			},
			countries: {
				create: countries,
			},
		});
	}

	@Get('findAll')
	@HttpCode(HttpStatus.OK)
	async findAll(): Promise<Movie[]> {
		return this.movieService.findAll();
	}

	@Get('findById/:id')
	@HttpCode(HttpStatus.OK)
	async findById(@Param('id') id: number): Promise<Movie> {
		const movieExists = await this.movieService.findById(Number(id));
		if (!movieExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		const res = await firstValueFrom(
			this.rabbitClient.send({ cmd: 'catalog--reviews-for-movie-request' }, id).pipe(timeout(2000)),
		);

		movieExists['reviews'] = res;

		return movieExists;
	}

	@Put('update')
	@HttpCode(HttpStatus.OK)
	async update(@Body(new ValidationPipe()) updateMovieDto: UpdateMovieDto): Promise<Movie> {
		const movieExists = await this.movieService.findById(Number(updateMovieDto.id));
		if (!movieExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		if (updateMovieDto.typeId !== undefined) {
			const typeExists = await this.typeService.findById(Number(updateMovieDto.typeId));
			if (!typeExists) {
				throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
			}
		}

		if (updateMovieDto.statusId !== undefined) {
			const statusExists = await this.statusService.findById(Number(updateMovieDto.statusId));
			if (!statusExists) {
				throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
			}
		}

		return this.movieService.update({
			where: { id: updateMovieDto.id },
			data: updateMovieDto,
		});
	}

	@Delete('delete')
	@HttpCode(HttpStatus.OK)
	async delete(@Body(new ValidationPipe()) deleteMovieDto: DeleteMovieDto): Promise<Movie> {
		const movieExists = await this.movieService.findById(Number(deleteMovieDto.id));
		if (!movieExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.movieService.delete({ id: deleteMovieDto.id });
	}

	@Post('uploadPoster')
	@HttpCode(HttpStatus.OK)
	@UseInterceptors(
		FileInterceptor('poster', {
			storage: diskStorage({
				destination: './uploads',
				filename: (req, file, cb) => {
					const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
					const ext = extname(file.originalname);
					cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
				},
			}),
		}),
	)
	uploadFile(@UploadedFile() file: Express.Multer.File): {
		message: string;
		filename: string;
	} {
		return {
			message: 'Файл успешно добавлен!',
			filename: file.filename,
		};
	}
}
