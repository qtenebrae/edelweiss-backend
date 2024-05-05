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
import { ParticipantService } from './participant.service';
import { Participant } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { DeleteParticipantDto } from './dto/delete-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Controller('participant')
@ApiTags('Participant')
export class ParticipantController {
	constructor(private participantService: ParticipantService) {}

	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async create(
		@Body(new ValidationPipe()) createParticipantDto: CreateParticipantDto,
	): Promise<Participant> {
		return this.participantService.create({
			character: createParticipantDto.character,
			profession: {
				connect: { id: Number(createParticipantDto.professionId) },
			},
			movie: {
				connect: { id: Number(createParticipantDto.movieId) },
			},
			person: {
				connect: { id: Number(createParticipantDto.personId) },
			},
		});
	}

	@Get('findAll')
	@HttpCode(HttpStatus.OK)
	async findAll(): Promise<Participant[]> {
		return this.participantService.findAll();
	}

	@Get('findById/:id')
	@HttpCode(HttpStatus.OK)
	async findById(@Param('id') id: number): Promise<Participant> {
		return this.participantService.findById(id);
	}

	@Put('update')
	@HttpCode(HttpStatus.OK)
	async update(
		@Body(new ValidationPipe()) updateParticipantDto: UpdateParticipantDto,
	): Promise<Participant> {
		const data = {};
		if (updateParticipantDto.character !== undefined)
			data['character'] = updateParticipantDto.character;

		if (updateParticipantDto.professionId !== undefined)
			data['profession'] = { connect: { id: Number(updateParticipantDto.professionId) } };
		if (updateParticipantDto.movieId !== undefined)
			data['movie'] = { connect: { id: Number(updateParticipantDto.movieId) } };
		if (updateParticipantDto.personId !== undefined)
			data['person'] = { connect: { id: Number(updateParticipantDto.personId) } };

		return this.participantService.update({
			where: { id: Number(updateParticipantDto.id) },
			data,
		});
	}

	@Delete('delete')
	@HttpCode(HttpStatus.OK)
	async delete(
		@Body(new ValidationPipe()) deleteParticipantDto: DeleteParticipantDto,
	): Promise<Participant> {
		return this.participantService.delete({ id: Number(deleteParticipantDto.id) });
	}
}
