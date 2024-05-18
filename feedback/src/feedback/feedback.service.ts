import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Feedback, Prisma } from '@prisma/client';

@Injectable()
export class FeedbackService {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: Prisma.FeedbackCreateInput): Promise<Feedback> {
		return this.prisma.feedback.create({
			data,
		});
	}

	async findAll(): Promise<Feedback[]> {
		return this.prisma.feedback.findMany();
	}

	async findById(id: number): Promise<Feedback> {
		return this.prisma.feedback.findUnique({ where: { id } });
	}

	async update(params: {
		where: Prisma.FeedbackWhereUniqueInput;
		data: Prisma.FeedbackUpdateInput;
	}): Promise<Feedback> {
		const { where, data } = params;

		return this.prisma.feedback.update({
			data,
			where,
		});
	}

	async delete(where: Prisma.FeedbackWhereUniqueInput): Promise<Feedback> {
		return this.prisma.feedback.delete({
			where,
		});
	}
}
