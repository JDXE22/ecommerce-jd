import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';
import dbConfig from './config/dbConfig';
import { OrderDetailsModule } from './orderDetails/order-details.module';
import { CategoriesModule } from './categories/categories.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { CloudinaryService } from './shared/cloudinary/cloudinary.service';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory:(configService: ConfigService) => configService.get('typeormDB')
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '1h'}
    })
    ,
    UsersModule,
    ProductsModule,
    AuthModule,
    OrdersModule,
    OrderDetailsModule,
    CategoriesModule,
    SeedModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryService],
})
export class AppModule {}
