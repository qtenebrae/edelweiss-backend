import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DeleteMovieDto {
	@IsInt()
	@ApiProperty()
	id: number;
}
