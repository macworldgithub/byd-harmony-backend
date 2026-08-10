const fs = require('fs');
const path = require('path');

const dirs = [
  'src/auth',
  'src/users',
  'src/locations',
  'src/customers',
  'src/vehicles',
  'src/bookings',
  'src/job-cards',
  'src/analytics',
  'src/common/guards',
  'src/common/decorators',
  'src/common/filters',
  'src/common/interceptors',
  'src/common/pipes',
];

dirs.forEach(dir => fs.mkdirSync(path.join(__dirname, dir), { recursive: true }));

const files = {
  'src/common/interceptors/response.interceptor.ts': `import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  data: T;
  message: string;
  meta?: any;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(res => {
        const data = res?.data !== undefined ? res.data : res;
        const meta = res?.meta;
        return {
          success: true,
          data,
          message: res?.message || 'Success',
          meta,
        };
      }),
    );
  }
}
`,
  'src/common/filters/all-exceptions.filter.ts': `import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse: any = exception.getResponse();
      message = exceptionResponse.message || exception.message;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({
      success: false,
      data: null,
      message: Array.isArray(message) ? message[0] : message,
    });
  }
}
`,
  'src/common/decorators/current-user.decorator.ts': `import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
`,
  'src/common/guards/jwt-auth.guard.ts': `import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
`,
};

for (const [filePath, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(__dirname, filePath), content);
}
console.log('Common files created.');
