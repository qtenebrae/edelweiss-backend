import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
	controllers: [CountryController],
	providers: [CountryService],
	imports: [DatabaseModule],
})
export class CountryModule {}
