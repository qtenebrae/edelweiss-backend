import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Participant, Prisma } from '@prisma/client';

@Injectable()
export class ParticipantService {
	constructor(private prisma: PrismaService) {}

	async create(data: Prisma.ParticipantCreateInput): Promise<Participant> {
		const professionExists = await this.prisma.profession.findUnique({
			where: data.profession.connect,
		});
		if (!professionExists) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}
		const movieExists = await this.prisma.movie.findUnique({ where: data.movie.connect });
		if (!movieExists) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}
		const personExists = await this.prisma.person.findUnique({ where: data.person.connect });
		if (!personExists) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		return this.prisma.participant.create({ data });
	}

	async findAll(): Promise<Participant[]> {
		return this.prisma.participant.findMany();
	}

	async findById(id: number): Promise<Participant> {
		const participantExists = await this.prisma.participant.findUnique({
			where: { id: Number(id) },
		});
		if (!participantExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}
		return participantExists;
	}

	async update(params: {
		where: Prisma.ParticipantWhereUniqueInput;
		data: Prisma.ParticipantUpdateInput;
	}): Promise<Participant> {
		const { where, data } = params;

		const participantExists = await this.prisma.participant.findUnique({ where });
		if (!participantExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		if (data.profession?.connect) {
			const professionExists = await this.prisma.profession.findUnique({
				where: data.profession.connect,
			});
			if (!professionExists) {
				throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
			}
		}

		if (data.movie?.connect) {
			const movieExists = await this.prisma.movie.findUnique({ where: data.movie.connect });
			if (!movieExists) {
				throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
			}
		}

		if (data.person?.connect) {
			const personExists = await this.prisma.person.findUnique({ where: data.person.connect });
			if (!personExists) {
				throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
			}
		}

		return this.prisma.participant.update({
			data,
			where,
		});
	}

	async delete(where: Prisma.ParticipantWhereUniqueInput): Promise<Participant> {
		const participantExists = await this.prisma.participant.findUnique({ where });
		if (!participantExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.prisma.participant.delete({ where });
	}
}
