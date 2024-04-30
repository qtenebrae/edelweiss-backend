import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
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
		const typeExists = await this.prisma.type.findUnique({ where: { id: Number(id) } });
		if (!typeExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}
		return typeExists;
	}

	async update(params: {
		where: Prisma.TypeWhereUniqueInput;
		data: Prisma.TypeUpdateInput;
	}): Promise<Type> {
		const { where, data } = params;
		const typeExists = await this.prisma.type.findUnique({ where });
		if (!typeExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.prisma.type.update({
			data,
			where,
		});
	}

	async delete(where: Prisma.TypeWhereUniqueInput): Promise<Type> {
		const typeExists = await this.prisma.type.findUnique({ where });
		if (!typeExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.prisma.type.delete({
			where,
		});
	}
}
