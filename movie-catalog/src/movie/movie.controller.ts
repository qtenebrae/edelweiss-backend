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
	ValidationPipe,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create-movie.dto';
import { DeleteMovieDto } from './dto/delete-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { TypeService } from 'src/type/type.service';
import { StatusService } from 'src/status/status.service';

@Controller('movie')
@ApiTags('Movie')
export class MovieController {
	constructor(
		private readonly movieService: MovieService,
		@Inject(forwardRef(() => TypeService)) private readonly typeService: TypeService,
		@Inject(forwardRef(() => StatusService)) private readonly statusService: StatusService,
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

		return movieExists;
	}

	@Put('update')
	@HttpCode(HttpStatus.OK)
	async update(@Body(new ValidationPipe()) updateMovieDto: UpdateMovieDto): Promise<Movie> {
		const movieExists = await this.movieService.findById(Number(updateMovieDto.id));
		if (!movieExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		const typeExists = await this.typeService.findById(Number(updateMovieDto.typeId));
		if (!typeExists) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		const statusExists = await this.statusService.findById(Number(updateMovieDto.statusId));
		if (!statusExists) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		const data = {};
		if (updateMovieDto.title !== undefined) data['title'] = updateMovieDto.title;
		if (updateMovieDto.alternativeTitle !== undefined)
			data['alternativeTitle'] = updateMovieDto.alternativeTitle;
		if (updateMovieDto.release !== undefined) data['release'] = updateMovieDto.release;
		if (updateMovieDto.description !== undefined) data['description'] = updateMovieDto.description;
		if (updateMovieDto.rating !== undefined) data['rating'] = updateMovieDto.rating;
		if (updateMovieDto.duration !== undefined) data['duration'] = updateMovieDto.duration;
		if (updateMovieDto.numberOfEpisodes !== undefined)
			data['numberOfEpisodes'] = updateMovieDto.numberOfEpisodes;
		if (updateMovieDto.ageLimit !== undefined) data['ageLimit'] = updateMovieDto.ageLimit;
		if (updateMovieDto.posterUrl !== undefined) data['posterUrl'] = updateMovieDto.posterUrl;
		if (updateMovieDto.typeId !== undefined)
			data['type'] = { connect: { id: Number(updateMovieDto.typeId) } };
		if (updateMovieDto.statusId !== undefined)
			data['status'] = { connect: { id: Number(updateMovieDto.statusId) } };

		return this.movieService.update({
			where: { id: updateMovieDto.id },
			data,
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
}
