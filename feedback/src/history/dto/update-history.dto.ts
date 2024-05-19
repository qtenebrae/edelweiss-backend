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

	@IsInt()
	@IsOptional()
	@ApiProperty()
	authotId: number;

	@IsInt()
	@IsOptional()
	@ApiProperty()
	categoryId: number;
}
