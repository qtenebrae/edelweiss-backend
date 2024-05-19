import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
	controllers: [HistoryController],
	providers: [HistoryService],
	imports: [DatabaseModule, CategoryModule],
})
export class HistoryModule {}
