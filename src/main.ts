import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { SeedCategoriesService } from './seed/seed.service';
import { ProductsSeed } from './seed/products/productsSeed.service';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { auth } from 'express-openid-connect';
import { config as authConfig } from './config/auth0.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(auth(authConfig));
  app.use(loggerGlobal);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory(errors) {
        const cleanErrors = errors.map((error) => {
          return { property: error.property, constraints: error.constraints };
        });
        return new BadRequestException({
          alert:
            'We have detected the following errors in your request and we are sending you this message',
          errors: cleanErrors,
        });
      },
    }),
  );
  const SeedCategories = app.get(SeedCategoriesService);
  await SeedCategories.seed();
  console.log(`La insercion de categories ha terminado`);
  const productSeed = app.get(ProductsSeed);
  if (!productSeed) {
    throw new Error(`No se pudo conectar`);
  }
  await productSeed.seed();
  console.log(`La insercion de productos ha terminado`);
  await app.listen(3000);
}
bootstrap();
