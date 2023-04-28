import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Constants } from './utils/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(Constants.API);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors();
  // Then combine it with your microservice
  const microservice = app.connectMicroservice({
    transport: Transport.TCP,
  });

  await app.startAllMicroservices();
  await app.listen(3300, () => console.log(`Listening on 3300`));
}
bootstrap();
