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
import { ProfessionService } from './profession.service';
import { Profession } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
import { DeleteProfessionDto } from './dto/delete-profession.dto';

@Controller('profession')
@ApiTags('Profession')
export class ProfessionController {
	constructor(private readonly professionService: ProfessionService) {}

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
		const professionExists = await this.professionService.findById(Number(id));
		if (!professionExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return professionExists;
	}

	@Put('update')
	@HttpCode(HttpStatus.OK)
	async update(
		@Body(new ValidationPipe()) updateProfessionDto: UpdateProfessionDto,
	): Promise<Profession> {
		const professionExists = await this.professionService.findById(Number(updateProfessionDto.id));
		if (!professionExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.professionService.update({
			where: { id: updateProfessionDto.id },
			data: { title: updateProfessionDto.title },
		});
	}

	@Delete('delete')
	@HttpCode(HttpStatus.OK)
	async delete(
		@Body(new ValidationPipe()) deleteProfessionDto: DeleteProfessionDto,
	): Promise<Profession> {
		const professionExists = await this.professionService.findById(Number(deleteProfessionDto.id));
		if (!professionExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.professionService.delete({ id: deleteProfessionDto.id });
	}
}
