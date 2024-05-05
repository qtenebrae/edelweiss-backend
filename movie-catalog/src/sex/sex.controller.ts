import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
	ValidationPipe,
} from '@nestjs/common';
import { SexService } from './sex.service';
import { Sex } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateSexDto } from './dto/create-sex.dto';
import { UpdateSexDto } from './dto/update-sex.dto';
import { DeleteSexDto } from './dto/delete-sex.dto';

@Controller('sex')
@ApiTags('Sex')
export class SexController {
	constructor(private sexService: SexService) {}

	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async create(@Body(new ValidationPipe()) createSexDto: CreateSexDto): Promise<Sex> {
		return this.sexService.create({ title: createSexDto.title });
	}

	@Get('findAll')
	@HttpCode(HttpStatus.OK)
	async findAll(): Promise<Sex[]> {
		return this.sexService.findAll();
	}

	@Get('findById/:id')
	@HttpCode(HttpStatus.OK)
	async findById(@Param('id') id: number): Promise<Sex> {
		return this.sexService.findById(id);
	}

	@Put('update')
	@HttpCode(HttpStatus.OK)
	async update(@Body(new ValidationPipe()) updateSexDto: UpdateSexDto): Promise<Sex> {
		return this.sexService.update({
			where: { id: Number(updateSexDto.id) },
			data: { title: updateSexDto.title },
		});
	}

	@Delete('delete')
	@HttpCode(HttpStatus.OK)
	async delete(@Body(new ValidationPipe()) deleteSexDto: DeleteSexDto): Promise<Sex> {
		return this.sexService.delete({ id: Number(deleteSexDto.id) });
	}
}
