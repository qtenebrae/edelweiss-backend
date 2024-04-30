import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Person, Prisma } from '@prisma/client';

@Injectable()
export class PersonService {
	constructor(private prisma: PrismaService) {}

	async create(data: Prisma.PersonCreateInput): Promise<Person> {
		const sexExists = await this.prisma.sex.findUnique({
			where: data.sex.connect,
		});
		if (!sexExists) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		return this.prisma.person.create({
			data,
		});
	}

	async findAll(): Promise<Person[]> {
		return this.prisma.person.findMany();
	}

	async findById(id: number): Promise<Person> {
		const personExists = await this.prisma.person.findUnique({ where: { id: Number(id) } });
		if (!personExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return personExists;
	}

	async update(params: {
		where: Prisma.PersonWhereUniqueInput;
		data: Prisma.PersonUpdateInput;
	}): Promise<Person> {
		const { where, data } = params;

		const personExists = await this.prisma.person.findUnique({
			where,
		});
		if (!personExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		if (data.sex?.connect) {
			const sexExists = await this.prisma.sex.findUnique({
				where: data.sex.connect,
			});

			if (!sexExists) {
				throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
			}
		}

		return this.prisma.person.update({
			data,
			where,
		});
	}

	async delete(where: Prisma.PersonWhereUniqueInput): Promise<Person> {
		const personExists = await this.prisma.person.findUnique({
			where,
		});
		if (!personExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.prisma.person.delete({ where });
	}
}
