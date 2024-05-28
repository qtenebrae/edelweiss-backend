import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { DatabaseModule } from 'src/database/database.module';
import { StatusModule } from 'src/status/status.module';
import { TypeModule } from 'src/type/type.module';
import { ClientProvider, ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	controllers: [MovieController],
	providers: [MovieService],
	imports: [
		DatabaseModule,
		StatusModule,
		TypeModule,
		ClientsModule.registerAsync([
			{
				name: 'INTERNAL',
				imports: [ConfigModule],
				useFactory: (configService: ConfigService): ClientProvider => ({
					transport: Transport.RMQ,
					options: {
						urls: [`${configService.get('RABBIT_URL')}`],
						queue: 'qtenebrae',
					},
				}),
				inject: [ConfigService],
			},
		]),
	],
	exports: [MovieService],
})
export class MovieModule {}
