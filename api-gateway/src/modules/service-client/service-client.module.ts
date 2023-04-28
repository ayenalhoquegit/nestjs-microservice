import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServiceClientController } from './service-client.controller';
import { ServiceClientService } from './service-client.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER-SERVICE',
        transport: Transport.TCP,
        options: {
          host: '192.168.8.165',
          port: 3001,
        },
      },
    ]),
  ],
  controllers: [ServiceClientController],
  providers: [ServiceClientService],
})
export class ServiceClientModule {}
