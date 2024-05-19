import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateHistoryDto {
	@IsInt()
	@ApiProperty()
	movieId: number;

	@IsInt()
	@ApiProperty()
	score: number;

	@IsInt()
	@ApiProperty()
	numberOfEpisodes: number;

	@IsInt()
	@ApiProperty()
	authotId: number;

	@IsInt()
	@ApiProperty()
	categoryId: number;
}
