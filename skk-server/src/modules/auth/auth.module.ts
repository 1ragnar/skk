require('dotenv').config();
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthController } from './controllers/auth.controller';
import { LoginRecord } from './entities';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([LoginRecord]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
