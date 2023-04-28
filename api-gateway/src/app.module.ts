import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceClientModule } from './modules/service-client/service-client.module';

@Module({
  imports: [ServiceClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
