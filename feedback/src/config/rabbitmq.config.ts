import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

export const getRabbitConfig = async (configService: ConfigService): Promise<RmqOptions> => {
	return {
		transport: Transport.RMQ,
		options: {
			urls: [getRabbitString(configService)],
		},
	};
};

const getRabbitString = (configService: ConfigService): string =>
	'amqp://' +
	configService.get('RABBIT_LOGIN') +
	':' +
	configService.get('RABBIT_PASSWORD') +
	'@' +
	configService.get('RABBIT_HOST') +
	':' +
	configService.get('RABBIT_PORT');
