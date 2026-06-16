import { APP_GUARD, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logging.middleware';
import { AuthGuard } from './guards/auth_guard.guard';
import { TransformInterceptor } from './interceptors/transform.interceptor';

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

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
