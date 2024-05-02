import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Movie, Prisma } from '@prisma/client';

@Injectable()
export class MovieService {
	constructor(private prisma: PrismaService) {}

	async create(data: Prisma.MovieCreateInput): Promise<Movie> {
		const typeExists = await this.prisma.type.findUnique({ where: data.type.connect });
		if (!typeExists) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}
		const statusExists = await this.prisma.status.findUnique({ where: data.status.connect });
		if (!statusExists) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		return this.prisma.movie.create({ data });
	}

	async findAll(): Promise<Movie[]> {
		return this.prisma.movie.findMany();
	}

	async findById(id: number): Promise<Movie> {
		const movieExists = await this.prisma.movie.findUnique({ where: { id: Number(id) } });
		if (!movieExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}
		return movieExists;
	}

	async update(params: {
		where: Prisma.MovieWhereUniqueInput;
		data: Prisma.MovieUpdateInput;
	}): Promise<Movie> {
		const { where, data } = params;

		const movieExists = await this.prisma.movie.findUnique({ where });
		if (!movieExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		if (data.type?.connect) {
			const typeExists = await this.prisma.type.findUnique({ where: data.type.connect });
			if (!typeExists) {
				throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
			}
		}

		if (data.status?.connect) {
			const statusExists = await this.prisma.status.findUnique({ where: data.status.connect });
			if (!statusExists) {
				throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
			}
		}

		return this.prisma.movie.update({
			data,
			where,
		});
	}

	async delete(where: Prisma.MovieWhereUniqueInput): Promise<Movie> {
		const movieExists = await this.prisma.movie.findUnique({ where });
		if (!movieExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.prisma.movie.delete({ where });
	}
}
