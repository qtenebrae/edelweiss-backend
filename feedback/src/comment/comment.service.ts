import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Comment, Prisma } from '@prisma/client';

@Injectable()
export class CommentService {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: Prisma.CommentCreateInput): Promise<Comment> {
		return this.prisma.comment.create({
			data,
		});
	}

	async findAll(): Promise<Comment[]> {
		return this.prisma.comment.findMany();
	}

	async findById(id: number): Promise<Comment> {
		return this.prisma.comment.findUnique({ where: { id } });
	}

	async update(params: {
		where: Prisma.CommentWhereUniqueInput;
		data: Prisma.CommentUpdateInput;
	}): Promise<Comment> {
		const { where, data } = params;

		return this.prisma.comment.update({
			data,
			where,
		});
	}

	async delete(where: Prisma.CommentWhereUniqueInput): Promise<Comment> {
		return this.prisma.comment.delete({
			where,
		});
	}
}
