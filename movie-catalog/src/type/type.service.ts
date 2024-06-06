import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Type, Prisma } from '@prisma/client';

@Injectable()
export class TypeService {
	constructor(private prisma: PrismaService) {}

	async create(data: Prisma.TypeCreateInput): Promise<Type> {
		return this.prisma.type.create({
			data,
		});
	}

	async findAll(): Promise<Type[]> {
		return this.prisma.type.findMany();
	}

	async findById(id: number): Promise<Type> {
		return await this.prisma.type.findUnique({ where: { id } });
	}

	async update(params: {
		where: Prisma.TypeWhereUniqueInput;
		data: Prisma.TypeUpdateInput;
	}): Promise<Type> {
		const { where, data } = params;

		return this.prisma.type.update({
			data,
			where,
		});
	}

	async delete(where: Prisma.TypeWhereUniqueInput): Promise<Type> {
		return this.prisma.type.delete({
			where,
		});
	}
}
