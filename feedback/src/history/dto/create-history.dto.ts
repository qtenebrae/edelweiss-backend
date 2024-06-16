import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class CreateHistoryDto {
	@IsInt()
	@ApiProperty()
	movieId: number;

	@IsInt()
	@ApiProperty()
	@IsOptional()
	score: number;

	@IsInt()
	@ApiProperty()
	@IsOptional()
	numberOfEpisodes: number;

	@ApiProperty()
	authorId: string;

	@IsInt()
	@ApiProperty()
	categoryId: number;
}
