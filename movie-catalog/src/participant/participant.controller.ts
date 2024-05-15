import {
	Body,
	Controller,
	Delete,
	forwardRef,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Inject,
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
import { ProfessionService } from 'src/profession/profession.service';
import { MovieService } from 'src/movie/movie.service';
import { PersonService } from 'src/person/person.service';

@Controller('participant')
@ApiTags('Participant')
export class ParticipantController {
	constructor(
		private readonly participantService: ParticipantService,
		@Inject(forwardRef(() => ProfessionService))
		private readonly professionService: ProfessionService,
		@Inject(forwardRef(() => MovieService)) private readonly movieService: MovieService,
		@Inject(forwardRef(() => PersonService)) private readonly personService: PersonService,
	) {}

	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async create(
		@Body(new ValidationPipe()) createParticipantDto: CreateParticipantDto,
	): Promise<Participant> {
		const professionExists = await this.professionService.findById(
			Number(createParticipantDto.professionId),
		);
		if (!professionExists) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		const movieExists = await this.movieService.findById(Number(createParticipantDto.movieId));
		if (!movieExists) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		const personExists = await this.personService.findById(Number(createParticipantDto.personId));
		if (!personExists) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

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
		const participantExists = await this.participantService.findById(Number(id));
		if (!participantExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return participantExists;
	}

	@Put('update')
	@HttpCode(HttpStatus.OK)
	async update(
		@Body(new ValidationPipe()) updateParticipantDto: UpdateParticipantDto,
	): Promise<Participant> {
		const participantExists = await this.participantService.findById(
			Number(updateParticipantDto.id),
		);
		if (!participantExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		const professionExists = await this.professionService.findById(
			Number(updateParticipantDto.professionId),
		);
		if (!professionExists) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		const movieExists = await this.movieService.findById(Number(updateParticipantDto.movieId));
		if (!movieExists) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		const personExists = await this.personService.findById(Number(updateParticipantDto.personId));
		if (!personExists) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

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
		const participantExists = await this.participantService.findById(
			Number(deleteParticipantDto.id),
		);
		if (!participantExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.participantService.delete({ id: deleteParticipantDto.id });
	}
}
