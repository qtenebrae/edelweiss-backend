import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
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
		const statusExists = await this.prisma.status.findUnique({ where: { id: Number(id) } });
		if (!statusExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}
		return statusExists;
	}

	async update(params: {
		where: Prisma.StatusWhereUniqueInput;
		data: Prisma.StatusUpdateInput;
	}): Promise<Status> {
		const { where, data } = params;
		const statusExists = await this.prisma.status.findUnique({ where });
		if (!statusExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.prisma.status.update({
			data,
			where,
		});
	}

	async delete(where: Prisma.StatusWhereUniqueInput): Promise<Status> {
		const statusExists = await this.prisma.status.findUnique({ where });
		if (!statusExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.prisma.status.delete({
			where,
		});
	}
}
