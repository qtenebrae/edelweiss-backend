import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Genre, Prisma } from '@prisma/client';

@Injectable()
export class GenreService {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: Prisma.GenreCreateInput): Promise<Genre> {
		return this.prisma.genre.create({
			data,
		});
	}

	async findAll(): Promise<Genre[]> {
		return this.prisma.genre.findMany();
	}

	async findById(id: number): Promise<Genre> {
		return this.prisma.genre.findUnique({ where: { id } });
	}

	async update(params: {
		where: Prisma.GenreWhereUniqueInput;
		data: Prisma.GenreUpdateInput;
	}): Promise<Genre> {
		const { where, data } = params;

		return this.prisma.genre.update({
			data,
			where,
		});
	}

	async delete(where: Prisma.GenreWhereUniqueInput): Promise<Genre> {
		return this.prisma.genre.delete({
			where,
		});
	}
}
