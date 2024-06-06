import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Participant, Prisma } from '@prisma/client';

@Injectable()
export class ParticipantService {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: Prisma.ParticipantCreateInput): Promise<Participant> {
		return this.prisma.participant.create({ data });
	}

	async findAll(): Promise<Participant[]> {
		return this.prisma.participant.findMany();
	}

	async findById(id: number): Promise<Participant> {
		return await this.prisma.participant.findUnique({
			where: { id },
		});
	}

	async update(params: {
		where: Prisma.ParticipantWhereUniqueInput;
		data: Prisma.ParticipantUpdateInput;
	}): Promise<Participant> {
		const { where, data } = params;

		return this.prisma.participant.update({
			data,
			where,
		});
	}

	async delete(where: Prisma.ParticipantWhereUniqueInput): Promise<Participant> {
		return this.prisma.participant.delete({ where });
	}
}
