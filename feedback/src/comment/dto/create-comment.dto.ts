import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
	@IsInt()
	@ApiProperty()
	movieId: number;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	text: string;

	@IsNotEmpty()
	@ApiProperty()
	publicationDate: Date;

	@IsInt()
	@ApiProperty()
	authotId: number;
}
