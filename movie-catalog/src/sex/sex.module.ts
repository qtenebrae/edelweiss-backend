import { Module } from '@nestjs/common';
import { SexController } from './sex.controller';
import { SexService } from './sex.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
	controllers: [SexController],
	providers: [SexService],
	imports: [DatabaseModule],
	exports: [SexService],
})
export class SexModule {}
