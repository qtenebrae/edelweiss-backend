import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { FeedbackModule } from './feedback/feedback.module';
import { CommentModule } from './comment/comment.module';
import { HistoryModule } from './history/history.module';

@Module({
	imports: [CategoryModule, FeedbackModule, CommentModule, HistoryModule],
})
export class AppModule {}
