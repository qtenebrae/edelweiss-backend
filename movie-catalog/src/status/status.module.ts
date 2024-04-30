import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
	controllers: [StatusController],
	providers: [StatusService],
	imports: [DatabaseModule],
})
export class StatusModule {}
