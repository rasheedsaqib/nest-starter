import {
  type ArgumentsHost,
  BadRequestException,
  Catch,
  type ExceptionFilter,
  HttpStatus
} from '@nestjs/common'

@Catch(BadRequestException)
export class ValidationExceptionFilter
  implements ExceptionFilter<BadRequestException>
{
  public catch(exception, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse()
    response.status(HttpStatus.BAD_REQUEST).json({
      status: `ValidationError`,
      message: ValidationExceptionFilter.formatErrors(
        exception.response.message
      )
    })
  }

  private static formatErrors(errors: string[]) {
    const formattedErrors: Record<string, string | string[]> = {}

    for (const error of errors) {
      const [key] = error.split(' ')

      if (formattedErrors[key] === undefined) {
        formattedErrors[key] = error
      } else if (typeof formattedErrors[key] === 'string') {
        // @ts-expect-error - can't push to string
        formattedErrors[key] = [formattedErrors[key], error]
      } else {
        // @ts-expect-error - can't push to string
        formattedErrors[key].push(error)
      }
    }

    return formattedErrors
  }
}
