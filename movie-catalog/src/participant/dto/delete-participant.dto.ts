import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DeleteParticipantDto {
	@IsInt()
	@ApiProperty()
	id: number;
}
