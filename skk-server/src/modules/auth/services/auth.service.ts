import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO, SignupDTO } from '../dtos';
import { AuthenticatedUser } from '../interfaces';
import { matchPassword } from 'src/modules/helpers/password.helper';
import { CRO_BUS_STATIONS } from 'src/typeorm/migrations/croBusStations';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(signupDTO: SignupDTO): Promise<AuthenticatedUser> {
    try {
      const user = await this.userService.createUser(signupDTO);

      const payload = { email: user.email, sub: user.id };
      const accessToken = this.jwtService.sign(payload);
      return {
        id: user.id,
        email: user.email,
        username: user.username,
        token: accessToken,
      };
    } catch (error) {
      throw new HttpException(
        'An error occurred while creating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginDTO: LoginDTO) {
    try {
      const dbUser = await this.userService.findUserByEmail(loginDTO.email);
      if (dbUser) {
        const { password } = dbUser;

        let isPasswordMatched = await matchPassword(
          password,
          loginDTO.password,
        );
        if (isPasswordMatched) {
          const payload = { email: loginDTO.email };
          let sanitizedUser = { ...dbUser };
          delete sanitizedUser.password;
          return {
            user: sanitizedUser,
            token: this.jwtService.sign(payload),
          };
        }
      } else {
        throw new HttpException(
          'Incorrect username or password',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Someting went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
