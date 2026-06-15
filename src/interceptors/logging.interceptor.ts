import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable ,tap} from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private  logger=new Logger(LoggingInterceptor.name);
    intercept(context:ExecutionContext, next:CallHandler):Observable<unknown> {
        const request = context.switchToHttp().getRequest();
        this.logger.log(`Before...`);
        
        const method = request.method;
        const url = request.url;
        const now = Date.now();
        return next.handle().pipe(
            tap(() => this.logger.log(`After ...${method} ${url} - ${Date.now() - now}ms`)),
        );
    }
}