import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	ValidationPipe,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { DeletePersonDto } from './dto/delete-person.dto';

@Controller('person')
@ApiTags('Person')
export class PersonController {
	constructor(private personService: PersonService) {}

	@Post('create')
	@HttpCode(201)
	async create(@Body(new ValidationPipe()) createPersonDto: CreatePersonDto): Promise<Person> {
		return this.personService.create({
			firstname: createPersonDto.firstname,
			lastname: createPersonDto.lastname,
			middlename: createPersonDto.middlename,
			birthday: createPersonDto.birthday,
			dateOfDeath: createPersonDto.dateOfDeath,
			sex: {
				connect: { id: Number(createPersonDto.sexId) },
			},
		});
	}

	@Get('findAll')
	@HttpCode(200)
	async findAll(): Promise<Person[]> {
		return this.personService.findAll();
	}

	@Get('findById/:id')
	@HttpCode(200)
	async findById(@Param('id') id: number): Promise<Person> {
		return this.personService.findById(id);
	}

	@Put('update')
	@HttpCode(200)
	async update(@Body(new ValidationPipe()) updatePersonDto: UpdatePersonDto): Promise<Person> {
		const data = {};
		if (updatePersonDto.firstname !== undefined) {
			data['firstname'] = updatePersonDto.firstname;
		}
		if (updatePersonDto.lastname !== undefined) {
			data['lastname'] = updatePersonDto.lastname;
		}
		if (updatePersonDto.middlename !== undefined) {
			data['middlename'] = updatePersonDto.middlename;
		}
		if (updatePersonDto.birthday !== undefined) {
			data['birthday'] = updatePersonDto.birthday;
		}
		if (updatePersonDto.dateOfDeath !== undefined) {
			data['dateOfDeath'] = updatePersonDto.dateOfDeath;
		}
		if (updatePersonDto.sexId !== undefined) {
			data['sex'] = { connect: { id: Number(updatePersonDto.sexId) } };
		}

		return this.personService.update({
			where: { id: Number(updatePersonDto.id) },
			data,
		});
	}

	@Delete('delete')
	@HttpCode(200)
	async delete(@Body(new ValidationPipe()) deletePersonDto: DeletePersonDto): Promise<Person> {
		return this.personService.delete({ id: Number(deletePersonDto.id) });
	}
}
