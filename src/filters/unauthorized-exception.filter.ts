import {
  type ArgumentsHost,
  type BadRequestException,
  Catch,
  type ExceptionFilter,
  HttpStatus,
  UnauthorizedException
} from '@nestjs/common'

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter
  implements ExceptionFilter<BadRequestException>
{
  public catch(exception, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse()
    response.status(HttpStatus.BAD_REQUEST).json({
      status: `Error`,
      message: exception.response.message
    })
  }
}
