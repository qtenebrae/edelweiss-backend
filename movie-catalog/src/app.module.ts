import { Module } from '@nestjs/common';
import { PersonModule } from './person/person.module';
import { ProfessionModule } from './profession/profession.module';
import { SexModule } from './sex/sex.module';

@Module({
	imports: [PersonModule, ProfessionModule, SexModule],
})
export class AppModule {}
