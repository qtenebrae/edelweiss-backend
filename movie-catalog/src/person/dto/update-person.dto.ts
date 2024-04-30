import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePersonDto {
	@IsInt()
	@ApiProperty()
	id: number;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	@ApiProperty()
	firstname: string;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	@ApiProperty()
	lastname: string;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	@ApiProperty()
	middlename: string;

	@IsNotEmpty()
	@IsOptional()
	@ApiProperty()
	birthday: Date;

	@IsNotEmpty()
	@IsOptional()
	@ApiProperty()
	dateOfDeath: Date;

	@IsInt()
	@IsOptional()
	@ApiProperty()
	sexId: number;
}
