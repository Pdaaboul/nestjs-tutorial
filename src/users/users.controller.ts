import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user-dto';
import { UpdateUserDTO } from './dto/update-user-dto';
@Controller('users')
export class UsersController {
  //we are adding the instance / we are injecting it into our controller
  constructor(private readonly usersService: UsersService) {}

  @Get() //GET /users or /users?role=value
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.usersService.findAll(role);
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post() //Post /users
  create(
    @Body(ValidationPipe)
    user: CreateUserDTO,
  ) {
    return this.usersService.create(user);
  }

  @Patch(':id') //Patch /users/id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    userUpdate: UpdateUserDTO,
  ) {
    return this.usersService.update(id, userUpdate);
  }

  @Delete(':id') //Delete /users/id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
