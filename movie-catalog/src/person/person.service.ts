import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Person, Prisma } from '@prisma/client';

@Injectable()
export class PersonService {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: Prisma.PersonCreateInput): Promise<Person> {
		return this.prisma.person.create({
			data,
		});
	}

	async findAll(): Promise<Person[]> {
		return this.prisma.person.findMany({
			include: {
				sex: true,
			},
		});
	}

	async findById(id: number): Promise<Person> {
		return await this.prisma.person.findUnique({ where: { id } });
	}

	async update(params: {
		where: Prisma.PersonWhereUniqueInput;
		data: Prisma.PersonUpdateInput;
	}): Promise<Person> {
		const { where, data } = params;

		return this.prisma.person.update({
			data,
			where,
		});
	}

	async delete(where: Prisma.PersonWhereUniqueInput): Promise<Person> {
		return this.prisma.person.delete({ where });
	}
}
