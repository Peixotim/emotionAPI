import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable()
export class TimingConnectionInterceptor implements NestInterceptor {
  public intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const now = Date.now();

    console.log(`TimingConnectionInterceptor execute time ${now}`);

    return next.handle().pipe(
      tap(() => {
        const finalTime = Date.now();
        const elapsed = finalTime - now;
        console.log(`TimingConnectionInterceptor execute time ${elapsed}`);
      }),
    );
  }
}
