import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Sex, Prisma } from '@prisma/client';

@Injectable()
export class SexService {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: Prisma.SexCreateInput): Promise<Sex> {
		return this.prisma.sex.create({
			data,
		});
	}

	async findAll(): Promise<Sex[]> {
		return this.prisma.sex.findMany();
	}

	async findById(id: number): Promise<Sex> {
		return this.prisma.sex.findUnique({ where: { id } });
	}

	async update(params: {
		where: Prisma.SexWhereUniqueInput;
		data: Prisma.SexUpdateInput;
	}): Promise<Sex> {
		const { where, data } = params;

		return this.prisma.sex.update({
			data,
			where,
		});
	}

	async delete(where: Prisma.SexWhereUniqueInput): Promise<Sex> {
		return this.prisma.sex.delete({ where });
	}
}
