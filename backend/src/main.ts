import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Queue from 'bull';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const queueMain = new Queue('main-app', {
        redis: { port: 6379, host: 'redis' },
    });
    const queueWorker = new Queue('worker-app', {
        redis: { port: 6379, host: 'redis' },
    });
    queueMain.process((data) => {
        console.log('queueMain process');
        return data;
    });

    queueMain.on('completed', (job, res) => {
        console.log('queueMain complete');
        console.log(`${job.id} is finished, its data was ${res}`);
    });

    queueWorker.add({ data: 'push from main' }, { delay: 10000 });
    console.log('queue-worker added');

    await app.listen(3000);
}

bootstrap();
