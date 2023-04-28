import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import CoreUtils from 'src/utils/core.utils';
import { UpdateUserServiceDto } from './dto/update-user-service.dto';
import { UserServiceDto } from './dto/user-service.dto';
import { ServiceClientService } from './service-client.service';

@Controller({ path: 'service-client', version: Constants.API_VERSION_1 })
export class ServiceClientController {
  constructor(private readonly serviceClientService: ServiceClientService) {}

  @Post()
  async create(@Body() userServiceDto: UserServiceDto) {
    //throw new UnprocessableEntityException('Email already exists');
    console.log('user dto');
    console.log(userServiceDto);
    const res = await this.serviceClientService.create(userServiceDto);
    if (res.error) {
      CoreUtils.throwRpcError(res.error);
    }
    return res;
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    //throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    console.log(page + ' ' + limit);
    return await this.serviceClientService.findAll({
      page: page,
      limit: limit,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const res = await this.serviceClientService.findOne(id);
    if (res.error) {
      CoreUtils.throwRpcError(res.error);
    }
    return res;
  }
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserServiceDto: UpdateUserServiceDto,
  ) {
    updateUserServiceDto.id = id;
    const res = await this.serviceClientService.update(updateUserServiceDto);
    if (res.error) {
      CoreUtils.throwRpcError(res.error);
    }
    return res;
  }
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const res = await this.serviceClientService.remove(id);
    if (res.error) {
      CoreUtils.throwRpcError(res.error);
    }
    return res;
  }
}
