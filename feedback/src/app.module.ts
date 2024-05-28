import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { HistoryModule } from './history/history.module';
import { ConfigModule } from '@nestjs/config';
import { ReviewModule } from './review/review.module';

@Module({
	imports: [ConfigModule.forRoot(), CategoryModule, ReviewModule, CommentModule, HistoryModule],
})
export class AppModule {}
