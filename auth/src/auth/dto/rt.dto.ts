import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RtDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	rt: string;
}
