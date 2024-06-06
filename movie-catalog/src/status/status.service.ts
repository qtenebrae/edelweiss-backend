import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Status, Prisma } from '@prisma/client';

@Injectable()
export class StatusService {
	constructor(private prisma: PrismaService) {}

	async create(data: Prisma.StatusCreateInput): Promise<Status> {
		return this.prisma.status.create({
			data,
		});
	}

	async findAll(): Promise<Status[]> {
		return this.prisma.status.findMany();
	}

	async findById(id: number): Promise<Status> {
		return await this.prisma.status.findUnique({ where: { id: Number(id) } });
	}

	async update(params: {
		where: Prisma.StatusWhereUniqueInput;
		data: Prisma.StatusUpdateInput;
	}): Promise<Status> {
		const { where, data } = params;

		return this.prisma.status.update({
			data,
			where,
		});
	}

	async delete(where: Prisma.StatusWhereUniqueInput): Promise<Status> {
		return this.prisma.status.delete({
			where,
		});
	}
}
