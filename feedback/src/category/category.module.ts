import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
	controllers: [CategoryController],
	providers: [CategoryService],
	imports: [DatabaseModule],
	exports: [CategoryService],
})
export class CategoryModule {}
