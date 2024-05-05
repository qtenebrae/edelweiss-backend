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
	@HttpCode(HttpStatus.CREATED)
	async create(
		@Body(new ValidationPipe()) createProfessionDto: CreateProfessionDto,
	): Promise<Profession> {
		return this.professionService.create({ title: createProfessionDto.title });
	}

	@Get('findAll')
	@HttpCode(HttpStatus.OK)
	async findAll(): Promise<Profession[]> {
		return this.professionService.findAll();
	}

	@Get('findById/:id')
	@HttpCode(HttpStatus.OK)
	async findById(@Param('id') id: number): Promise<Profession> {
		return this.professionService.findById(id);
	}

	@Put('update')
	@HttpCode(HttpStatus.OK)
	async update(
		@Body(new ValidationPipe()) updateProfessionDto: UpdateProfessionDto,
	): Promise<Profession> {
		return this.professionService.update({
			where: { id: Number(updateProfessionDto.id) },
			data: { title: updateProfessionDto.title },
		});
	}

	@Delete('delete')
	@HttpCode(HttpStatus.OK)
	async delete(
		@Body(new ValidationPipe()) deleteProfessionDto: DeleteProfessionDto,
	): Promise<Profession> {
		return this.professionService.delete({ id: Number(deleteProfessionDto.id) });
	}
}
