import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Profession } from '@prisma/client';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
import { DeleteProfessionDto } from './dto/delete-profession.dto';

@Injectable()
export class ProfessionService {
	constructor(private prisma: PrismaService) {}

	async create(createProfessionDto: CreateProfessionDto): Promise<Profession> {
		return this.prisma.profession.create({
			data: {
				title: createProfessionDto.title,
			},
		});
	}

	async findAll(): Promise<Profession[]> {
		return this.prisma.profession.findMany();
	}

	async findById(id: number): Promise<Profession> {
		return this.prisma.profession.findUnique({ where: { id: Number(id) } });
	}

	async update(updateProfessionDto: UpdateProfessionDto): Promise<Profession> {
		return this.prisma.profession.update({
			data: { title: updateProfessionDto.title },
			where: { id: Number(updateProfessionDto.id) },
		});
	}

	async delete(deleteProfessionDto: DeleteProfessionDto): Promise<Profession> {
		return this.prisma.profession.delete({
			where: { id: Number(deleteProfessionDto.id) },
		});
	}
}
