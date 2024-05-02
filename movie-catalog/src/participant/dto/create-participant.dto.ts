import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateParticipantDto {
	@IsString()
	@IsOptional()
	@ApiProperty()
	character?: string | null;

	@IsInt()
	@ApiProperty()
	professionId: number;

	@IsInt()
	@ApiProperty()
	movieId: number;

	@IsInt()
	@ApiProperty()
	personId: number;
}
