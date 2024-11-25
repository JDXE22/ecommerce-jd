import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './usersRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Orders } from 'src/orders/entities/orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Orders])],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  exports: [UsersRepository, UsersService]
})
export class UsersModule {}
