import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Movie, Prisma } from '@prisma/client';

@Injectable()
export class MovieService {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: Prisma.MovieCreateInput): Promise<Movie> {
		return this.prisma.movie.create({ data });
	}

	async findAll(): Promise<Movie[]> {
		return this.prisma.movie.findMany({
			include: {
				type: true,
				status: true,
				genres: {
					include: {
						genre: true,
					},
				},
				countries: {
					include: {
						country: true,
					},
				},
				participants: {
					include: {
						person: true,
						profession: true,
					},
				},
			},
		});
	}

	async findById(id: number): Promise<Movie> {
		return await this.prisma.movie.findUnique({
			where: { id },
			include: {
				type: true,
				status: true,
				genres: {
					include: {
						genre: true,
					},
				},
				countries: {
					include: {
						country: true,
					},
				},
				participants: {
					include: {
						person: true,
						profession: true,
					},
				},
			},
		});
	}

	async update(params: {
		where: Prisma.MovieWhereUniqueInput;
		data: Prisma.MovieUpdateInput;
	}): Promise<Movie> {
		const { where, data } = params;

		return this.prisma.movie.update({
			data,
			where,
		});
	}

	async delete(where: Prisma.MovieWhereUniqueInput): Promise<Movie> {
		return this.prisma.movie.delete({
			where,
		});
	}

	async getMoviesByIds(ids: number[]): Promise<Movie[]> {
		return await this.prisma.movie.findMany({
			where: { id: { in: ids } },
			include: {
				type: true,
				status: true,
				genres: {
					include: {
						genre: true,
					},
				},
				countries: {
					include: {
						country: true,
					},
				},
				participants: {
					include: {
						person: true,
						profession: true,
					},
				},
			},
		});
	}
}
