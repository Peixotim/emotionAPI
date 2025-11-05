import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
export class TimingConnectionInterceptor implements NestInterceptor {
  public intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
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
