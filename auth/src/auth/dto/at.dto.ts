import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AtDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	at: string;
}
