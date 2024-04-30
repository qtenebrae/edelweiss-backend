import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DeleteGenreDto {
	@IsInt()
	@ApiProperty()
	id: number;
}
