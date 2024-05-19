import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DeleteCommentDto {
	@IsInt()
	@ApiProperty()
	id: number;
}
