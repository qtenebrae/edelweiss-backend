import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
	imports: [CategoryModule, FeedbackModule],
})
export class AppModule {}
