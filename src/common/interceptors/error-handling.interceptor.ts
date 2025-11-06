import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class ErrorHandlingInterceptor implements NestInterceptor {
  public intercept(_context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof HttpException) {
          return throwError(() => error);
        }
        console.error('[ErrorHandlingInterceptor] Erro não tratado:', error);
        return throwError(() => {
          return new InternalServerErrorException(
            `'Sorry, this error was not addressed by our team, please contact us to correct the error',`,
          );
        });
      }),
    );
  }
}
