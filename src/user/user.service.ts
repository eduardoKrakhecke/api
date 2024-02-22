import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
  }

  async create(data: CreateUserDto) {
    return await this.userRepository.save(data);
  }

  async read() {
    return await this.userRepository.find();
  }

  async getById(id: number) {
    const user = await this.userRepository.findOne({ where: { id: String(id) } });
    if (!user) {
      throw new NotFoundException(' Usuário não encontrado');
    }
    return user;

  }

  async update(id: number, data: UpdatePutUserDto) {
    await this.exists(id)
    return await this.userRepository.update(id, data);
  }

  async updatePartial(id: number, data: UpdatePatchUserDto) {
    await this.exists(id)
    return await this.userRepository.update(id, data)
  }

  async delete(id: number) {
   await this.exists(id)
    return await this.userRepository.delete(id);
  }

  async exists(id: number) {
    if( !(await this.getById(id))) {
      throw new NotFoundException(`O usuário ${id} não existe !`);
    }
  }

}