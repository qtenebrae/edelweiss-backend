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
import { SexService } from './sex.service';
import { Sex } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateSexDto } from './dto/create-sex.dto';
import { UpdateSexDto } from './dto/update-sex.dto';
import { DeleteSexDto } from './dto/delete-sex.dto';

@Controller('sex')
@ApiTags('Sex')
export class SexController {
	constructor(private readonly sexService: SexService) {}

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
		const sexExists = await this.sexService.findById(Number(id));
		if (!sexExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return sexExists;
	}

	@Put('update')
	@HttpCode(HttpStatus.OK)
	async update(@Body(new ValidationPipe()) updateSexDto: UpdateSexDto): Promise<Sex> {
		const sexExists = await this.sexService.findById(Number(updateSexDto.id));
		if (!sexExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.sexService.update({
			where: { id: updateSexDto.id },
			data: { title: updateSexDto.title },
		});
	}

	@Delete('delete')
	@HttpCode(HttpStatus.OK)
	async delete(@Body(new ValidationPipe()) deleteSexDto: DeleteSexDto): Promise<Sex> {
		const sexExists = await this.sexService.findById(Number(deleteSexDto.id));
		if (!sexExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.sexService.delete({ id: deleteSexDto.id });
	}
}
