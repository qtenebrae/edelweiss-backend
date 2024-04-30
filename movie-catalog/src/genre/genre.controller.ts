import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { GenreService } from './genre.service';
import { Genre } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { DeleteGenreDto } from './dto/delete-genre.dto';

@Controller('genre')
@ApiTags('Genre')
export class GenreController {
	constructor(private genreService: GenreService) {}

	@Post('create')
	async create(@Body(new ValidationPipe()) createGenreDto: CreateGenreDto): Promise<Genre> {
		return this.genreService.create({ title: createGenreDto.title });
	}

	@Get('findAll')
	async findAll(): Promise<Genre[]> {
		return this.genreService.findAll();
	}

	@Get('findById/:id')
	async findById(@Param('id') id: number): Promise<Genre> {
		return this.genreService.findById(id);
	}

	@Put('update')
	async update(@Body(new ValidationPipe()) updateGenreDto: UpdateGenreDto): Promise<Genre> {
		return this.genreService.update({
			where: { id: Number(updateGenreDto.id) },
			data: { title: updateGenreDto.title },
		});
	}

	@Delete('delete')
	async delete(@Body(new ValidationPipe()) deleteGenreDto: DeleteGenreDto): Promise<Genre> {
		return this.genreService.delete({ id: Number(deleteGenreDto.id) });
	}
}
