import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Constants } from './utils/constants';

@Controller({ path: 'app', version: Constants.API_VERSION_1 })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    const str = '["ayenal","hoque"]';
    console.log(JSON.parse(str));
    return JSON.parse(str);
    //return this.appService.getHello();
  }
}
