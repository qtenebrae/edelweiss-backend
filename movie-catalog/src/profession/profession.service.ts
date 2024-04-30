import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Profession, Prisma } from '@prisma/client';

@Injectable()
export class ProfessionService {
	constructor(private prisma: PrismaService) {}

	async create(data: Prisma.ProfessionCreateInput): Promise<Profession> {
		return this.prisma.profession.create({
			data,
		});
	}

	async findAll(): Promise<Profession[]> {
		return this.prisma.profession.findMany();
	}

	async findById(id: number): Promise<Profession> {
		const professionExists = await this.prisma.profession.findUnique({ where: { id: Number(id) } });
		if (!professionExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}
		return professionExists;
	}

	async update(params: {
		where: Prisma.ProfessionWhereUniqueInput;
		data: Prisma.ProfessionUpdateInput;
	}): Promise<Profession> {
		const { where, data } = params;
		const professionExists = await this.prisma.profession.findUnique({ where });
		if (!professionExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.prisma.profession.update({
			data,
			where,
		});
	}

	async delete(where: Prisma.ProfessionWhereUniqueInput): Promise<Profession> {
		const professionExists = await this.prisma.profession.findUnique({ where });
		if (!professionExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.prisma.profession.delete({
			where,
		});
	}
}
