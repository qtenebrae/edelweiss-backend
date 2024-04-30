import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdatePersonDto {
	@IsInt()
	@ApiProperty()
	id: number;

	@IsString()
	@IsOptional()
	@ApiProperty()
	firstname: string;

	@IsString()
	@IsOptional()
	@ApiProperty()
	lastname: string;

	@IsString()
	@IsOptional()
	@ApiProperty()
	middlename: string;

	@IsOptional()
	@ApiProperty()
	birthday: Date;

	@IsOptional()
	@ApiProperty()
	dateOfDeath: Date;

	@IsInt()
	@IsOptional()
	@ApiProperty()
	sexId: number;
}
