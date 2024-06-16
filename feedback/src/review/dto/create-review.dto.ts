import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateReviewDto {
	@IsInt()
	@ApiProperty()
	movieId: number;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	header: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	text: string;

	@IsInt()
	@ApiProperty()
	score: number;

	@IsNotEmpty()
	@ApiProperty()
	publicationDate: Date;

	@ApiProperty()
	authorId: string;
}
