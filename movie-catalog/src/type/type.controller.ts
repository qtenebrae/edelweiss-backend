import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	Post,
	Put,
	ValidationPipe,
} from '@nestjs/common';
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
	@HttpCode(HttpStatus.CREATED)
	async create(@Body(new ValidationPipe()) createTypeDto: CreateTypeDto): Promise<Type> {
		return this.typeService.create({ title: createTypeDto.title });
	}

	@Get('findAll')
	@HttpCode(HttpStatus.OK)
	async findAll(): Promise<Type[]> {
		return this.typeService.findAll();
	}

	@Get('findById/:id')
	@HttpCode(HttpStatus.OK)
	async findById(@Param('id') id: number): Promise<Type> {
		const typeExists = await this.typeService.findById(Number(id));
		if (!typeExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return typeExists;
	}

	@Put('update')
	@HttpCode(HttpStatus.OK)
	async update(@Body(new ValidationPipe()) updateTypeDto: UpdateTypeDto): Promise<Type> {
		const typeExists = await this.typeService.findById(Number(updateTypeDto.id));
		if (!typeExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.typeService.update({
			where: { id: updateTypeDto.id },
			data: { title: updateTypeDto.title },
		});
	}

	@Delete('delete')
	@HttpCode(HttpStatus.OK)
	async delete(@Body(new ValidationPipe()) deleteTypeDto: DeleteTypeDto): Promise<Type> {
		const typeExists = await this.typeService.findById(Number(deleteTypeDto.id));
		if (!typeExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.typeService.delete({ id: deleteTypeDto.id });
	}
}
