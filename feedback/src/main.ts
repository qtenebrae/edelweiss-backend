import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('feedback');

	const config = new DocumentBuilder()
		.setTitle('Feedback Service')
		.setDescription('API of the feedback service')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(3003);
}

bootstrap();
