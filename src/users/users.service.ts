import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user-dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateUserDTO } from './dto/update-user-dto';
@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'user',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'moderator',
    },
    {
      id: 4,
      name: 'Bob Brown',
      email: 'bob.brown@example.com',
      role: 'user',
    },
    {
      id: 5,
      name: 'Charlie Davis',
      email: 'charlie.davis@example.com',
      role: 'admin',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const roles = this.users.filter((user) => user.role === role);
      if (roles.length === 0) {
        throw new NotFoundException('User Role not found');
        return roles;
      }
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  create(user: CreateUserDTO) {
    const maxID = this.users.reduce(
      (max, user) => (user.id > max ? user.id : max),
      0,
    );
    const newUser = {
      id: maxID + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUser: UpdateUserDTO) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, updateUser };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
