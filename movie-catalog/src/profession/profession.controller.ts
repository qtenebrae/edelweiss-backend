import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { ProfessionService } from './profession.service';
import { Profession } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
import { DeleteProfessionDto } from './dto/delete-profession.dto';

@Controller('profession')
@ApiTags('Profession')
export class ProfessionController {
	constructor(private professionService: ProfessionService) {}

	@Post('create')
	async create(
		@Body(new ValidationPipe()) createProfessionDto: CreateProfessionDto,
	): Promise<Profession> {
		return this.professionService.create(createProfessionDto);
	}

	@Get('findAll')
	async findAll(): Promise<Profession[]> {
		return this.professionService.findAll();
	}

	@Get('findById/:id')
	async findById(@Param('id') id: number): Promise<Profession> {
		return this.professionService.findById(id);
	}

	@Put('update')
	async update(
		@Body(new ValidationPipe()) updateProfessionDto: UpdateProfessionDto,
	): Promise<Profession> {
		return this.professionService.update(updateProfessionDto);
	}

	@Delete('delete')
	async delete(
		@Body(new ValidationPipe()) deleteProfessionDto: DeleteProfessionDto,
	): Promise<Profession> {
		return this.professionService.delete(deleteProfessionDto);
	}
}
