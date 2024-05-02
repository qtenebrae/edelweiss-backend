import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateParticipantDto {
	@IsInt()
	@ApiProperty()
	id: number;

	@IsString()
	@IsOptional()
	@ApiProperty()
	character?: string | null;

	@IsInt()
	@IsOptional()
	@ApiProperty()
	professionId: number;

	@IsInt()
	@IsOptional()
	@ApiProperty()
	movieId: number;

	@IsInt()
	@IsOptional()
	@ApiProperty()
	personId: number;
}
