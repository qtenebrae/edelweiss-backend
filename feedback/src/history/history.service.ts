import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { History, Prisma } from '@prisma/client';

@Injectable()
export class HistoryService {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: Prisma.HistoryCreateInput): Promise<History> {
		return this.prisma.history.create({
			data,
		});
	}

	async findAll(): Promise<History[]> {
		return this.prisma.history.findMany();
	}

	async findWhere(data: { authorId: string; movieId: number }): Promise<History[]> {
		const where = {};

		if (data.authorId) {
			where['authorId'] = data.authorId;
		}

		if (data.movieId) {
			where['movieId'] = Number(data.movieId);
		}

		return this.prisma.history.findMany({
			where,
		});
	}

	async findById(id: number): Promise<History> {
		return this.prisma.history.findUnique({ where: { id } });
	}

	async update(params: {
		where: Prisma.HistoryWhereUniqueInput;
		data: Prisma.HistoryUpdateInput;
	}): Promise<History> {
		const { where, data } = params;

		return this.prisma.history.update({
			data,
			where,
		});
	}

	async delete(where: Prisma.HistoryWhereUniqueInput): Promise<History> {
		return this.prisma.history.delete({
			where,
		});
	}
}
