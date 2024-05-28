import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);
	app.enableCors({ credentials: true, origin: true });
	app.setGlobalPrefix('catalog');

	const configService = app.get(ConfigService);
	app.connectMicroservice({
		transport: Transport.RMQ,
		options: {
			urls: [configService.get('RABBIT_URL')],
		},
	});

	const config = new DocumentBuilder()
		.setTitle('Movie Catalog Service')
		.setDescription('API of the movie catalog service')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.startAllMicroservices();
	await app.listen(3002);
}

bootstrap();
