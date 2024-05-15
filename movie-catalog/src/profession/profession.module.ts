import { Module } from '@nestjs/common';
import { ProfessionController } from './profession.controller';
import { ProfessionService } from './profession.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
	controllers: [ProfessionController],
	providers: [ProfessionService],
	imports: [DatabaseModule],
	exports: [ProfessionService],
})
export class ProfessionModule {}
