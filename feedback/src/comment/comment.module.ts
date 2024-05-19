import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
	controllers: [CommentController],
	providers: [CommentService],
	imports: [DatabaseModule],
})
export class CommentModule {}
