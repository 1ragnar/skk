import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './modules/auth/controllers/auth.controller';
import { AuthService } from './modules/auth/services/auth.service';
import entities from './typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { BusesModule } from './modules/buses/buses.module';
import { BusesController } from './modules/buses/controllers/buses.controller';
import { RoutesModule } from './modules/routes/routes.module';
import { RoutesController } from './modules/routes/controllers/routes.controller';
import { SeatsModule } from './modules/seats/seats.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { TicketsController } from './modules/tickets/controllers/tickets.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: entities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    BusesModule,
    RoutesModule,
    SeatsModule,
    TicketsModule,
    PaymentsModule,
  ],
  controllers: [
    AuthController,
    BusesController,
    RoutesController,
    TicketsController,
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AppModule {}
