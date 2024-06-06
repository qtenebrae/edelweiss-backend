import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Review, Prisma } from '@prisma/client';

@Injectable()
export class ReviewService {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: Prisma.ReviewCreateInput): Promise<Review> {
		return this.prisma.review.create({
			data,
		});
	}

	async findAll(): Promise<Review[]> {
		return this.prisma.review.findMany();
	}

	async findById(id: number): Promise<Review> {
		return this.prisma.review.findUnique({ where: { id } });
	}

	async update(params: {
		where: Prisma.ReviewWhereUniqueInput;
		data: Prisma.ReviewUpdateInput;
	}): Promise<Review> {
		const { where, data } = params;

		return this.prisma.review.update({
			data,
			where,
		});
	}

	async delete(where: Prisma.ReviewWhereUniqueInput): Promise<Review> {
		return this.prisma.review.delete({
			where,
		});
	}

	async getReviewsByMovieId(id: number): Promise<Review[]> {
		return this.prisma.review.findMany({
			where: {
				movieId: id,
			},
		});
	}
}
