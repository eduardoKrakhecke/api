import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';

@Controller('users')
export class UserController {

  @Post()
  async create(@Body() { email, password, name }: CreateUserDto) {
    return { email, password, name };
  }

  @Get()
  async list() {
    return { users: [] };
  }

  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) id: number) {
    return { user: {}, id };
  }

  @Put(':id')
  async update(
    @Body() { email, password, name }: UpdatePutUserDto,
    @Param('id', ParseIntPipe) id: number) {
    return { email, password, name, id };
  }

  @Patch(':id')
  async updatePartial(
    @Body() { email, password, name }: UpdatePatchUserDto,
    @Param('id', ParseIntPipe) id: number) {
    return { email, password, name, id };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }
}