import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Country, Prisma } from '@prisma/client';

@Injectable()
export class CountryService {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: Prisma.CountryCreateInput): Promise<Country> {
		return this.prisma.country.create({
			data,
		});
	}

	async findAll(): Promise<Country[]> {
		return this.prisma.country.findMany();
	}

	async findById(id: number): Promise<Country> {
		return this.prisma.country.findUnique({ where: { id } });
	}

	async update(params: {
		where: Prisma.CountryWhereUniqueInput;
		data: Prisma.CountryUpdateInput;
	}): Promise<Country> {
		const { where, data } = params;

		return this.prisma.country.update({
			data,
			where,
		});
	}

	async delete(where: Prisma.CountryWhereUniqueInput): Promise<Country> {
		return this.prisma.country.delete({
			where,
		});
	}
}
