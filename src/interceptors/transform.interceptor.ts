import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";


@Injectable()
export class TransformInterceptor implements NestInterceptor {
  private  logger=new Logger(TransformInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    this.logger.log('Transforming response data Before...');
    return next.handle().pipe(
      tap(() => this.logger.log('Transforming response data After...')),
      map(data => ({
        data,
        timestamp: new Date().toISOString(),
      })
    ),
    );
  }
}