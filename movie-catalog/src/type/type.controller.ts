import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { TypeService } from './type.service';
import { Type } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { DeleteTypeDto } from './dto/delete-type.dto';

@Controller('type')
@ApiTags('Type')
export class TypeController {
	constructor(private typeService: TypeService) {}

	@Post('create')
	async create(@Body(new ValidationPipe()) createTypeDto: CreateTypeDto): Promise<Type> {
		return this.typeService.create({ title: createTypeDto.title });
	}

	@Get('findAll')
	async findAll(): Promise<Type[]> {
		return this.typeService.findAll();
	}

	@Get('findById/:id')
	async findById(@Param('id') id: number): Promise<Type> {
		return this.typeService.findById(id);
	}

	@Put('update')
	async update(@Body(new ValidationPipe()) updateTypeDto: UpdateTypeDto): Promise<Type> {
		return this.typeService.update({
			where: { id: Number(updateTypeDto.id) },
			data: { title: updateTypeDto.title },
		});
	}

	@Delete('delete')
	async delete(@Body(new ValidationPipe()) deleteTypeDto: DeleteTypeDto): Promise<Type> {
		return this.typeService.delete({ id: Number(deleteTypeDto.id) });
	}
}
