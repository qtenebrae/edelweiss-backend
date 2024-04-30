import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { CountryService } from './country.service';
import { Country } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { DeleteCountryDto } from './dto/delete-country.dto';

@Controller('country')
@ApiTags('Country')
export class CountryController {
	constructor(private countryService: CountryService) {}

	@Post('create')
	async create(@Body(new ValidationPipe()) createCountryDto: CreateCountryDto): Promise<Country> {
		return this.countryService.create({ title: createCountryDto.title });
	}

	@Get('findAll')
	async findAll(): Promise<Country[]> {
		return this.countryService.findAll();
	}

	@Get('findById/:id')
	async findById(@Param('id') id: number): Promise<Country> {
		return this.countryService.findById(id);
	}

	@Put('update')
	async update(@Body(new ValidationPipe()) updateCountryDto: UpdateCountryDto): Promise<Country> {
		return this.countryService.update({
			where: { id: Number(updateCountryDto.id) },
			data: { title: updateCountryDto.title },
		});
	}

	@Delete('delete')
	async delete(@Body(new ValidationPipe()) deleteCountryDto: DeleteCountryDto): Promise<Country> {
		return this.countryService.delete({ id: Number(deleteCountryDto.id) });
	}
}
