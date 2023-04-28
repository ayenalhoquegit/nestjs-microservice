import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateUserServiceDto } from './dto/update-user-service.dto';
import { UserServiceDto } from './dto/user-service.dto';

@Injectable()
export class ServiceClientService {
  constructor(
    @Inject('USER-SERVICE')
    private client: ClientProxy,
  ) {}
  async findAll(paginationInfo: object) {
    return new Promise<any>((resolve, reject) => {
      this.client.send<object>('findAllUserService', paginationInfo).subscribe({
        next: (result) => {
          console.log(result);
          resolve(result);
        },
        error: (err) => {
          reject(err);
        },
        complete: () => console.log('complete'),
      });
    });
  }

  async create(userServiceDto: UserServiceDto) {
    const pattern = { cmd: 'createUserService' };
    const payload = userServiceDto;
    return new Promise<any>((resolve, reject) => {
      this.client.send<object>(pattern, payload).subscribe({
        next: (result) => {
          console.log(result);
          console.log('result type', typeof result);
          resolve(result);
        },
        error: (err) => {
          console.log('error form service', err);
          reject(err);
        },
        complete: () => console.log('complete'),
      });
    });
  }

  async findOne(id: number) {
    return new Promise<any>((resolve, reject) => {
      this.client.send<number>('findOneUserService', id).subscribe({
        next: (result) => {
          resolve(result);
        },
        error: (err) => {
          reject(err);
        },
        complete: () => console.log('complete'),
      });
    });
  }
  async update(updateUserServiceDto: UpdateUserServiceDto) {
    return new Promise<any>((resolve, reject) => {
      this.client
        .send<object>('updateUserService', updateUserServiceDto)
        .subscribe({
          next: (result) => {
            resolve(result);
          },
          error: (err) => {
            reject(err);
          },
          complete: () => console.log('complete'),
        });
    });
  }
  async remove(id: number) {
    return new Promise<any>((resolve, reject) => {
      this.client.send<number>('removeUserService', id).subscribe({
        next: (result) => {
          resolve(result);
        },
        error: (err) => {
          reject(err);
        },
        complete: () => console.log('complete'),
      });
    });
  }
}
