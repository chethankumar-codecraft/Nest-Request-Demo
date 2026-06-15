import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './middlewares/logging.middleware';
import { ipBlock } from './middlewares/logging_function.middleware';
import { AuthGuard } from './guards/auth_guard.guard';
import { UsersModule } from './modules/users/users.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD, // custom provider if we have dependecy injection in AuthGuard constructor
      useClass: AuthGuard,
    },
    {
      provide:APP_INTERCEPTOR,
      useClass:LoggingInterceptor,
    },
    TransformInterceptor,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }

  //   configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes(CatController);
  // }

  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes({ path: 'cat', method: RequestMethod.GET });
  // }

  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes({
  //     path: 'abcd/*splat',
  //     method: RequestMethod.ALL,
  //   });
  // }

  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).exclude({ path: 'cat', method: RequestMethod.GET })
  //     .forRoutes(CatController)
  // }

  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware, ipBlock)
  //     .forRoutes(CatController)
  // }
}
