import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { DataSource, Repository } from 'typeorm';
import { CreateUserServiceDto } from './dto/create-user-service.dto';
import { UpdateUserServiceDto } from './dto/update-user-service.dto';
import { UserServiceEntity } from './entities/user-service.entity';

@Injectable()
export class UserServiceRepository extends Repository<UserServiceEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserServiceEntity, dataSource.createEntityManager());
  }

  async createEntity(
    createUserServiceDto: CreateUserServiceDto,
  ): Promise<UserServiceEntity | Error> {
    try {
      const {
        name,
        email,
        phone,
        password: pass,
        photo,
      } = createUserServiceDto;
      const entity = this.create({
        name,
        email,
        phone,
        password: await bcrypt.hash(pass, 10),
        photo,
      });
      await this.save(entity);
      return entity;
    } catch (e) {
      return e;
    }
  }
  // async paginate(
  //   options: IPaginationOptions,
  // ): Promise<Pagination<UserServiceEntity>> {
  //   return paginate<UserServiceEntity>(this, options);
  // }

  async paginate(
    options: IPaginationOptions,
  ): Promise<Pagination<UserServiceEntity>> {
    const queryBuilder = this.createQueryBuilder('c');
    queryBuilder.orderBy('c.id', 'DESC'); // Or whatever you need to do

    return paginate<UserServiceEntity>(queryBuilder, options);
  }

  async readManyEntities(): Promise<UserServiceEntity[] | Error> {
    try {
      return this.find();
    } catch (e) {
      return e;
    }
  }

  async readEntity(options: object): Promise<UserServiceEntity[] | Error> {
    try {
      return this.find({ where: options });
    } catch (e) {
      return e;
    }
  }

  async findByCredential(
    credential: object,
  ): Promise<UserServiceEntity | Error> {
    try {
      return await this.findOne({
        where: [credential],
      });
    } catch (e) {
      return null;
    }
  }

  async updateEntity(
    id: number,
    updateUserServiceDto: UpdateUserServiceDto,
  ): Promise<any> {
    try {
      const updateResult = await this.update(id, updateUserServiceDto);
      if (updateResult.affected > 0) {
        return await this.findOne({
          where: { id: id },
        });
      }
      return null;
    } catch (e) {
      return e;
    }
  }

  async deleteUser(id: number): Promise<boolean | Error> {
    try {
      const deleteResponse = await this.delete(id);
      if (deleteResponse.affected > 0) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
}
