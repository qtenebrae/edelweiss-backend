import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateFeedbackDto {
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

	@IsInt()
	@IsOptional()
	@ApiProperty()
	authotId: number;
}
