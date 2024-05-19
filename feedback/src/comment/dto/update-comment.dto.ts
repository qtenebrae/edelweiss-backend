import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto {
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
	text: string;

	@IsNotEmpty()
	@IsOptional()
	@ApiProperty()
	publicationDate: Date;

	@IsInt()
	@IsOptional()
	@ApiProperty()
	authotId: number;
}
