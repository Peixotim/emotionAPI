import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class ErrorHandlingInterceptor implements NestInterceptor {
  public intercept(_context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      catchError((error) => {
        return throwError(() => {
          if (error instanceof HttpException) {
            return new BadRequestException(
              'Sorry, this error was not addressed by our team, please contact us to correct the error',
            );
          }
        });
      }),
    );
  }
}
