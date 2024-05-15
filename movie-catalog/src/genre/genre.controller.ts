import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	Post,
	Put,
	ValidationPipe,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { Genre } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { DeleteGenreDto } from './dto/delete-genre.dto';

@Controller('genre')
@ApiTags('Genre')
export class GenreController {
	constructor(private readonly genreService: GenreService) {}

	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async create(@Body(new ValidationPipe()) createGenreDto: CreateGenreDto): Promise<Genre> {
		return this.genreService.create({ title: createGenreDto.title });
	}

	@Get('findAll')
	@HttpCode(HttpStatus.OK)
	async findAll(): Promise<Genre[]> {
		return this.genreService.findAll();
	}

	@Get('findById/:id')
	@HttpCode(HttpStatus.OK)
	async findById(@Param('id') id: number): Promise<Genre> {
		const genreExists = await this.genreService.findById(Number(id));
		if (!genreExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return genreExists;
	}

	@Put('update')
	@HttpCode(HttpStatus.OK)
	async update(@Body(new ValidationPipe()) updateGenreDto: UpdateGenreDto): Promise<Genre> {
		const genreExists = await this.genreService.findById(Number(updateGenreDto.id));
		if (!genreExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.genreService.update({
			where: { id: updateGenreDto.id },
			data: { title: updateGenreDto.title },
		});
	}

	@Delete('delete')
	@HttpCode(HttpStatus.OK)
	async delete(@Body(new ValidationPipe()) deleteGenreDto: DeleteGenreDto): Promise<Genre> {
		const genreExists = await this.genreService.findById(Number(deleteGenreDto.id));
		if (!genreExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.genreService.delete({ id: deleteGenreDto.id });
	}
}
