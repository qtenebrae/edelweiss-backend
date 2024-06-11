import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);
	app.enableCors({ credentials: true, origin: true });
	app.setGlobalPrefix('rating');

	const configService = app.get(ConfigService);
	app.connectMicroservice({
		transport: Transport.RMQ,
		options: {
			urls: [configService.get('RABBIT_URL')],
			queue: 'edelweiss',
		},
	});

	const config = new DocumentBuilder()
		.setTitle('Rating Service')
		.setDescription('API of the Rating service')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.startAllMicroservices();
	await app.listen(3004);
}

bootstrap();
