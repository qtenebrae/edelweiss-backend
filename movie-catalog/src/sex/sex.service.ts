import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Sex } from '@prisma/client';
import { CreateSexDto } from './dto/create-sex.dto';
import { UpdateSexDto } from './dto/update-sex.dto';
import { DeleteSexDto } from './dto/delete-sex.dto';

@Injectable()
export class SexService {
	constructor(private prisma: PrismaService) {}

	async create(createSexDto: CreateSexDto): Promise<Sex> {
		return this.prisma.sex.create({
			data: {
				title: createSexDto.title,
			},
		});
	}

	async findAll(): Promise<Sex[]> {
		return this.prisma.sex.findMany();
	}

	async findById(id: number): Promise<Sex> {
		return this.prisma.sex.findUnique({ where: { id: Number(id) } });
	}

	async update(updateSexDto: UpdateSexDto): Promise<Sex> {
		return this.prisma.sex.update({
			data: { title: updateSexDto.title },
			where: { id: Number(updateSexDto.id) },
		});
	}

	async delete(deleteSexDto: DeleteSexDto): Promise<Sex> {
		return this.prisma.sex.delete({ where: { id: Number(deleteSexDto.id) } });
	}
}
