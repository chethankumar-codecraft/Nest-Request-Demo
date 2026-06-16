import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AppService } from 'src/app.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(LoggerMiddleware.name);
  constructor(private readonly appService: AppService) {}
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log('Middleware Logger');
    // req['user'] = 'user123';
    req['user'] = 'admin';
    this.logger.log(`METHOD: ${req.method}`);
    next();
  }
}
