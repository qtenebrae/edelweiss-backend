import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class UpdateSexDto {
	@IsInt()
	@ApiProperty()
	id: number;

	@IsString()
	@ApiProperty()
	title: string;
}
