import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Category, Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: Prisma.CategoryCreateInput): Promise<Category> {
		return this.prisma.category.create({
			data,
		});
	}

	async findAll(): Promise<Category[]> {
		return this.prisma.category.findMany();
	}

	async findById(id: number): Promise<Category> {
		return this.prisma.category.findUnique({ where: { id } });
	}

	async update(params: {
		where: Prisma.CategoryWhereUniqueInput;
		data: Prisma.CategoryUpdateInput;
	}): Promise<Category> {
		const { where, data } = params;

		return this.prisma.category.update({
			data,
			where,
		});
	}

	async delete(where: Prisma.CategoryWhereUniqueInput): Promise<Category> {
		return this.prisma.category.delete({
			where,
		});
	}
}
