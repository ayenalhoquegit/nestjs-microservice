import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { CreateUserServiceDto } from './dto/create-user-service.dto';
import { UpdateUserServiceDto } from './dto/update-user-service.dto';
import { UserServiceRepository } from './user-service.repository';

@Injectable()
export class UserServiceService {
  constructor(private readonly userServiceRepository: UserServiceRepository) {}
  async create(createUserServiceDto: CreateUserServiceDto) {
    return await this.userServiceRepository.createEntity(createUserServiceDto);
  }

  async findAll() {
    return await this.userServiceRepository.readManyEntities();
  }

  async paginate(options: IPaginationOptions) {
    return await this.userServiceRepository.paginate(options);
  }

  async findOne(id: number) {
    const user = await this.userServiceRepository.findByCredential({ id: id });
    console.log('user one', user);
    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async update(id: number, updateUserServiceDto: UpdateUserServiceDto) {
    const result = await this.userServiceRepository.updateEntity(
      id,
      updateUserServiceDto,
    );
    if (!result) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }

  async remove(id: number) {
    const result = await this.userServiceRepository.deleteUser(id);
    if (!result) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }
}
