import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Sex, Prisma } from '@prisma/client';

@Injectable()
export class SexService {
	constructor(private prisma: PrismaService) {}

	async create(data: Prisma.SexCreateInput): Promise<Sex> {
		return this.prisma.sex.create({
			data,
		});
	}

	async findAll(): Promise<Sex[]> {
		return this.prisma.sex.findMany();
	}

	async findById(id: number): Promise<Sex> {
		const sexExists = await this.prisma.sex.findUnique({ where: { id: Number(id) } });
		if (!sexExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}
		return sexExists;
	}

	async update(params: {
		where: Prisma.SexWhereUniqueInput;
		data: Prisma.SexUpdateInput;
	}): Promise<Sex> {
		const { where, data } = params;
		const sexExists = await this.prisma.sex.findUnique({ where });
		if (!sexExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.prisma.sex.update({
			data,
			where,
		});
	}

	async delete(where: Prisma.SexWhereUniqueInput): Promise<Sex> {
		const sexExists = await this.prisma.sex.findUnique({ where });
		if (!sexExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.prisma.sex.delete({ where });
	}
}
