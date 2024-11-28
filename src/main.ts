import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { SeedCategoriesService } from './seed/seed.service';
import { ProductsSeed } from './seed/products/productsSeed.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use( loggerGlobal)
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
  }))
  const SeedCategories = app.get(SeedCategoriesService)
  await SeedCategories.seed();
  console.log(`La insercion de categories ha terminado`);
  const productSeed = app.get(ProductsSeed)
  if(!productSeed){
    throw new Error(`No se pudo conectar`)
  }
  await productSeed.seed()
  console.log(`La insercion de productos ha terminado`);
  await app.listen(3000);


}
bootstrap();
