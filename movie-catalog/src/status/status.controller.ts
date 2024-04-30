import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { StatusService } from './status.service';
import { Status } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { DeleteStatusDto } from './dto/delete-status.dto';

@Controller('status')
@ApiTags('Status')
export class StatusController {
	constructor(private statusService: StatusService) {}

	@Post('create')
	async create(@Body(new ValidationPipe()) createStatusDto: CreateStatusDto): Promise<Status> {
		return this.statusService.create({ title: createStatusDto.title });
	}

	@Get('findAll')
	async findAll(): Promise<Status[]> {
		return this.statusService.findAll();
	}

	@Get('findById/:id')
	async findById(@Param('id') id: number): Promise<Status> {
		return this.statusService.findById(id);
	}

	@Put('update')
	async update(@Body(new ValidationPipe()) updateStatusDto: UpdateStatusDto): Promise<Status> {
		return this.statusService.update({
			where: { id: Number(updateStatusDto.id) },
			data: { title: updateStatusDto.title },
		});
	}

	@Delete('delete')
	async delete(@Body(new ValidationPipe()) deleteStatusDto: DeleteStatusDto): Promise<Status> {
		return this.statusService.delete({ id: Number(deleteStatusDto.id) });
	}
}