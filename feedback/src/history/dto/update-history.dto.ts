import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateHistoryDto {
	@IsInt()
	@ApiProperty()
	id: number;

	@IsInt()
	@IsOptional()
	@ApiProperty()
	movieId: number;

	@IsInt()
	@IsOptional()
	@ApiProperty()
	score: number;

	@IsInt()
	@IsOptional()
	@ApiProperty()
	numberOfEpisodes: number;

	@IsOptional()
	@ApiProperty()
	authorId: string;

	@IsInt()
	@IsOptional()
	@ApiProperty()
	categoryId: number;
}
