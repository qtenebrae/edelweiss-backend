import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMovieDto {
	@IsInt()
	@ApiProperty()
	id: number;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	@ApiProperty()
	title: string;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	@ApiProperty()
	alternativeTitle: string;

	@IsNotEmpty()
	@IsOptional()
	@ApiProperty()
	release: Date;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	@ApiProperty()
	description: string;

	@IsNumber()
	@IsNotEmpty()
	@IsOptional()
	@ApiProperty()
	rating: number;

	@IsNumber()
	@IsNotEmpty()
	@IsOptional()
	@ApiProperty()
	duration: number;

	@IsInt()
	@IsNotEmpty()
	@IsOptional()
	@ApiProperty()
	numberOfEpisodes: number;

	@IsInt()
	@IsNotEmpty()
	@IsOptional()
	@ApiProperty()
	ageLimit: number;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	@ApiProperty()
	posterUrl: string;

	@IsInt()
	@IsNotEmpty()
	@IsOptional()
	@ApiProperty()
	typeId: number;

	@IsInt()
	@IsNotEmpty()
	@IsOptional()
	@ApiProperty()
	statusId: number;
}
