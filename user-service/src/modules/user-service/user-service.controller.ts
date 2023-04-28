import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'src/pagination-option.dto';
import { RpcValidationFilter } from 'src/rpc-validation.filter';
import { CreateUserServiceDto } from './dto/create-user-service.dto';
import { UpdateUserServiceDto } from './dto/update-user-service.dto';
import { UserServiceService } from './user-service.service';
@Controller()
@UseFilters(new RpcValidationFilter())
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @MessagePattern({ cmd: 'createUserService' })
  create(@Payload() createUserServiceDto: CreateUserServiceDto) {
    return this.userServiceService.create(createUserServiceDto);
  }

  @MessagePattern('findAllUserService')
  findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    console.log(paginationDto);
    return this.userServiceService.paginate({
      page,
      limit,
      route: 'http://localhost:3300/api/v1/service-client',
    });
  }

  @MessagePattern('findOneUserService')
  findOne(@Payload() id: number) {
    return this.userServiceService.findOne(id);
  }

  @MessagePattern('updateUserService')
  update(@Payload() updateUserServiceDto: UpdateUserServiceDto) {
    return this.userServiceService.update(
      updateUserServiceDto.id,
      updateUserServiceDto,
    );
  }

  @MessagePattern('removeUserService')
  remove(@Payload() id: number) {
    return this.userServiceService.remove(id);
  }
}
