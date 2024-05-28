import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);
	app.enableCors({ credentials: true, origin: true });
	app.setGlobalPrefix('feedback');

	const configService = app.get(ConfigService);
	app.connectMicroservice({
		transport: Transport.RMQ,
		options: {
			urls: [configService.get('RABBIT_URL')],
			queue: 'qtenebrae',
		},
	});

	const config = new DocumentBuilder()
		.setTitle('Feedback Service')
		.setDescription('API of the feedback service')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.startAllMicroservices();
	await app.listen(3003);
}

bootstrap();
