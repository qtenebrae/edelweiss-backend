import { Module } from '@nestjs/common';
import { PersonModule } from './person/person.module';
import { ProfessionModule } from './profession/profession.module';
import { SexModule } from './sex/sex.module';
import { GenreModule } from './genre/genre.module';
import { StatusModule } from './status/status.module';
import { CountryModule } from './country/country.module';
import { TypeModule } from './type/type.module';
import { MovieModule } from './movie/movie.module';
import { ParticipantModule } from './participant/participant.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'uploads'),
			serveRoot: '/uploads',
		}),
		ConfigModule.forRoot(),
		GenreModule,
		MovieModule,
		ParticipantModule,
		PersonModule,
		ProfessionModule,
		CountryModule,
		StatusModule,
		TypeModule,
		SexModule,
	],
})
export class AppModule {}
