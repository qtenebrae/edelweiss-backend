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
import { CommentService } from './comment.service';
import { Comment } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
@ApiTags('Comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async create(@Body(new ValidationPipe()) createCommentDto: CreateCommentDto): Promise<Comment> {
		return this.commentService.create(createCommentDto);
	}

	@Get('findAll')
	@HttpCode(HttpStatus.OK)
	async findAll(): Promise<Comment[]> {
		return this.commentService.findAll();
	}

	@Get('findById/:id')
	@HttpCode(HttpStatus.OK)
	async findById(@Param('id') id: number): Promise<Comment> {
		const commentExists = await this.commentService.findById(Number(id));
		if (!commentExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return commentExists;
	}

	@Put('update')
	@HttpCode(HttpStatus.OK)
	async update(@Body(new ValidationPipe()) updateCommentDto: UpdateCommentDto): Promise<Comment> {
		const commentExists = await this.commentService.findById(Number(updateCommentDto.id));
		if (!commentExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.commentService.update({
			where: { id: updateCommentDto.id },
			data: updateCommentDto,
		});
	}

	@Delete('delete')
	@HttpCode(HttpStatus.OK)
	async delete(@Body(new ValidationPipe()) deleteCommentDto: DeleteCommentDto): Promise<Comment> {
		const commentExists = await this.commentService.findById(Number(deleteCommentDto.id));
		if (!commentExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.commentService.delete({ id: deleteCommentDto.id });
	}
}
