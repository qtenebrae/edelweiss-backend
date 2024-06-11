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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { DeleteGenreDto } from './dto/delete-genre.dto';

@Controller('genre')
@ApiTags('Genre')
export class GenreController {
	constructor(private readonly genreService: GenreService) {}

	@ApiOperation({ summary: 'Добавление новго жанра' })
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async create(@Body(new ValidationPipe()) createGenreDto: CreateGenreDto): Promise<Genre> {
		return this.genreService.create({ title: createGenreDto.title });
	}

	@ApiOperation({ summary: 'Получение списка жанров' })
	@Get('findAll')
	@HttpCode(HttpStatus.OK)
	async findAll(): Promise<Genre[]> {
		return this.genreService.findAll();
	}

	@ApiOperation({ summary: 'Получение жанра по идентификатору' })
	@Get('findById/:id')
	@HttpCode(HttpStatus.OK)
	async findById(@Param('id') id: number): Promise<Genre> {
		const genreExists = await this.genreService.findById(Number(id));
		if (!genreExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return genreExists;
	}

	@ApiOperation({ summary: 'Обновление жанра' })
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

	@ApiOperation({ summary: 'Удаление жанра' })
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
