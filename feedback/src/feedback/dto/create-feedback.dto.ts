import { ApiProperty } from '@nestjs/swagger';
import { IsInt, isNotEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateFeedbackDto {
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

	@IsInt()
	@ApiProperty()
	authotId: number;
}
