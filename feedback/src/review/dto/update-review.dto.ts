import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateReviewDto {
	@IsInt()
	@ApiProperty()
	id: number;

	@IsInt()
	@IsOptional()
	@ApiProperty()
	movieId: number;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	@ApiProperty()
	header: string;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	@ApiProperty()
	text: string;

	@IsInt()
	@IsOptional()
	@ApiProperty()
	score: number;

	@IsNotEmpty()
	@IsOptional()
	@ApiProperty()
	publicationDate: Date;

	@IsOptional()
	@ApiProperty()
	authorId: string;
}
