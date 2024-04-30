import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Country, Prisma } from '@prisma/client';

@Injectable()
export class CountryService {
	constructor(private prisma: PrismaService) {}

	async create(data: Prisma.CountryCreateInput): Promise<Country> {
		return this.prisma.country.create({
			data,
		});
	}

	async findAll(): Promise<Country[]> {
		return this.prisma.country.findMany();
	}

	async findById(id: number): Promise<Country> {
		const countryExists = await this.prisma.country.findUnique({ where: { id: Number(id) } });
		if (!countryExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}
		return countryExists;
	}

	async update(params: {
		where: Prisma.CountryWhereUniqueInput;
		data: Prisma.CountryUpdateInput;
	}): Promise<Country> {
		const { where, data } = params;
		const countryExists = await this.prisma.country.findUnique({ where });
		if (!countryExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.prisma.country.update({
			data,
			where,
		});
	}

	async delete(where: Prisma.CountryWhereUniqueInput): Promise<Country> {
		const countryExists = await this.prisma.country.findUnique({ where });
		if (!countryExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.prisma.country.delete({
			where,
		});
	}
}
