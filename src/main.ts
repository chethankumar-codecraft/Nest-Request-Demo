import { APP_GUARD, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logging.middleware';
import { AuthGuard } from './guards/auth_guard.guard';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AllExceptionFilter } from './filters/allexception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // MIDDLEWARES

  // app.use(new LoggerMiddleware(app.get(AppService)).use);
  // app.use(ipBlock);

  // GAURDS

  // app.useGlobalGuards(new AuthGuard(new Reflector()));

  //INTERCEPTORS

  // app.useGlobalInterceptors(app.get(TransformInterceptor));

  //PIPES

  // app.useGlobalPipes(new ValidationPipe({
  //   transform:true, // to transform incoming request data to the type of the DTO class
  //   whitelist:true, // to remove any properties that are not defined in the DTO class
  //   forbidNonWhitelisted:true,  // to throw an error if any properties that are not defined in the DTO class are present in the incoming request data
  // }))

  //EXCEPTION FILTERS

  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new AllExceptionFilter());


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
