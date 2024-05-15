import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Profession, Prisma } from '@prisma/client';

@Injectable()
export class ProfessionService {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: Prisma.ProfessionCreateInput): Promise<Profession> {
		return this.prisma.profession.create({
			data,
		});
	}

	async findAll(): Promise<Profession[]> {
		return this.prisma.profession.findMany();
	}

	async findById(id: number): Promise<Profession> {
		return await this.prisma.profession.findUnique({ where: { id: Number(id) } });
	}

	async update(params: {
		where: Prisma.ProfessionWhereUniqueInput;
		data: Prisma.ProfessionUpdateInput;
	}): Promise<Profession> {
		const { where, data } = params;

		return this.prisma.profession.update({
			data,
			where,
		});
	}

	async delete(where: Prisma.ProfessionWhereUniqueInput): Promise<Profession> {
		return this.prisma.profession.delete({
			where,
		});
	}
}
