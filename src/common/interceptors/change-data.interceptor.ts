import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
// Adiciona um dado a mais
@Injectable()
export class ChangeDataInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe((data) => {
      return data;
    });
  }
}
