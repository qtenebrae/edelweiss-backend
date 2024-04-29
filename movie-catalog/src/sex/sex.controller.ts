import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { SexService } from './sex.service';
import { Profession, Sex } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateSexDto } from './dto/create-sex.dto';
import { UpdateSexDto } from './dto/update-sex.dto';
import { DeleteSexDto } from './dto/delete-sex.dto';

@Controller('sex')
@ApiTags('Sex')
export class SexController {
	constructor(private sexService: SexService) {}

	@Post('create')
	async create(@Body(new ValidationPipe()) createSexDto: CreateSexDto): Promise<Profession> {
		return this.sexService.create(createSexDto);
	}

	@Get('findAll')
	async findAll(): Promise<Sex[]> {
		return this.sexService.findAll();
	}

	@Get('findById/:id')
	async findById(@Param('id') id: number): Promise<Sex> {
		return this.sexService.findById(id);
	}

	@Put('update')
	async update(@Body(new ValidationPipe()) updateSexDto: UpdateSexDto): Promise<Sex> {
		return this.sexService.update(updateSexDto);
	}

	@Delete('delete')
	async delete(@Body(new ValidationPipe()) deleteSexDto: DeleteSexDto): Promise<Sex> {
		return this.sexService.delete(deleteSexDto);
	}
}
