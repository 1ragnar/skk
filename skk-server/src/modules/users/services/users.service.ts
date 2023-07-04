import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDTO } from 'src/modules/auth/dtos';
import { encrypt } from 'src/modules/helpers/password.helper';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(signupDTO: SignupDTO) {
    try {
      const existingUser = await this.findUserByEmail(signupDTO.email);

      if (existingUser) {
        throw new HttpException(
          'The email is already used',
          HttpStatus.UNAUTHORIZED,
        );
      } else {
        const newUser = this.userRepository.create();
        newUser.email = signupDTO.email;
        newUser.username = signupDTO.username;
        newUser.password = await encrypt(signupDTO.password);

        await this.userRepository.save(newUser);
        return newUser;
      }
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUsersById(id: number) {
    try {
      return this.userRepository.findOneBy({ id: id });
    } catch (error) {
      throw new HttpException('No such user', HttpStatus.BAD_REQUEST);
    }
  }

  async findUserByEmail(email: string) {
    try {
      return this.userRepository.findOneBy({ email: email });
    } catch (error) {
      throw new HttpException('No such user', HttpStatus.BAD_REQUEST);
    }
  }

  async getUsers() {
    try {
      return this.userRepository.find();
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
