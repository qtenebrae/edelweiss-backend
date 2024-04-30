import { Module } from '@nestjs/common';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
	controllers: [TypeController],
	providers: [TypeService],
	imports: [DatabaseModule],
})
export class TypeModule {}
