import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	Post,
	Put,
	ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DeleteCategoryDto } from './dto/delete-category.dto';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async create(
		@Body(new ValidationPipe()) createCategoryDto: CreateCategoryDto,
	): Promise<Category> {
		return this.categoryService.create({ title: createCategoryDto.title });
	}

	@Get('findAll')
	@HttpCode(HttpStatus.OK)
	async findAll(): Promise<Category[]> {
		return this.categoryService.findAll();
	}

	@Get('findById/:id')
	@HttpCode(HttpStatus.OK)
	async findById(@Param('id') id: number): Promise<Category> {
		const categoryExists = await this.categoryService.findById(Number(id));
		if (!categoryExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return categoryExists;
	}

	@Put('update')
	@HttpCode(HttpStatus.OK)
	async update(
		@Body(new ValidationPipe()) updateCategoryDto: UpdateCategoryDto,
	): Promise<Category> {
		const categoryExists = await this.categoryService.findById(Number(updateCategoryDto.id));
		if (!categoryExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.categoryService.update({
			where: { id: updateCategoryDto.id },
			data: { title: updateCategoryDto.title },
		});
	}

	@Delete('delete')
	@HttpCode(HttpStatus.OK)
	async delete(
		@Body(new ValidationPipe()) deleteCategoryDto: DeleteCategoryDto,
	): Promise<Category> {
		const categoryExists = await this.categoryService.findById(Number(deleteCategoryDto.id));
		if (!categoryExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.categoryService.delete({ id: deleteCategoryDto.id });
	}
}
