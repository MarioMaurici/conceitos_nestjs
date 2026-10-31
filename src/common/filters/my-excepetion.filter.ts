import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, NotFoundException } from '@nestjs/common';
import path from 'path';

@Catch(HttpException)
export class MyExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const context  = host.switchToHttp();
    const response = context.getResponse();
    const request  = context.getRequest();

    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const error = typeof response === 'string' ? {
        message: exceptionResponse
    } : (exceptionResponse as Object);

    response.status(statusCode).json({
        ...error,
        data: new Date().toISOString(),
        path: request.url,
    });
  }
}