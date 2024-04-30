import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Genre, Prisma } from '@prisma/client';

@Injectable()
export class GenreService {
	constructor(private prisma: PrismaService) {}

	async create(data: Prisma.GenreCreateInput): Promise<Genre> {
		return this.prisma.genre.create({
			data,
		});
	}

	async findAll(): Promise<Genre[]> {
		return this.prisma.genre.findMany();
	}

	async findById(id: number): Promise<Genre> {
		const genreExists = await this.prisma.genre.findUnique({ where: { id: Number(id) } });
		if (!genreExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}
		return genreExists;
	}

	async update(params: {
		where: Prisma.GenreWhereUniqueInput;
		data: Prisma.GenreUpdateInput;
	}): Promise<Genre> {
		const { where, data } = params;
		const genreExists = await this.prisma.genre.findUnique({ where });
		if (!genreExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.prisma.genre.update({
			data,
			where,
		});
	}

	async delete(where: Prisma.GenreWhereUniqueInput): Promise<Genre> {
		const genreExists = await this.prisma.genre.findUnique({ where });
		if (!genreExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.prisma.genre.delete({
			where,
		});
	}
}
