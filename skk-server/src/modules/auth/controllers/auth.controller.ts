import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDTO, SignupDTO } from '../dtos';
import { AuthService } from '../services/auth.service';

@Controller('auth')
@UsePipes(new ValidationPipe())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('signup')
  async onUserSignup(@Body() signupDTO: SignupDTO) {
    try {
      const res = await this.authService.signup(signupDTO);
      return res;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @HttpCode(202)
  @Post('login')
  async onUserLogin(@Body() loginDTO: LoginDTO) {
    try {
      return await this.authService.login(loginDTO);
    } catch (error) {
      throw new HttpException(
        'User with given email and password do not exist',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
