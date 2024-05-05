import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
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

@Controller('movie')
@ApiTags('Movie')
export class MovieController {
	constructor(private movieService: MovieService) {}

	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async create(@Body(new ValidationPipe()) createMovieDto: CreateMovieDto): Promise<Movie> {
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
		return this.movieService.findById(id);
	}

	@Put('update')
	@HttpCode(HttpStatus.OK)
	async update(@Body(new ValidationPipe()) updateMovieDto: UpdateMovieDto): Promise<Movie> {
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
			where: { id: Number(updateMovieDto.id) },
			data,
		});
	}

	@Delete('delete')
	@HttpCode(HttpStatus.OK)
	async delete(@Body(new ValidationPipe()) deleteMovieDto: DeleteMovieDto): Promise<Movie> {
		return this.movieService.delete({ id: Number(deleteMovieDto.id) });
	}
}
