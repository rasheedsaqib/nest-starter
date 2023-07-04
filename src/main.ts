import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from '@/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )

  await app.listen(3000)
}

bootstrap()
  .then(() => {
    console.log(`App started on ${process.env.PORT ?? 8080}`)
  })
  .catch(error => {
    console.error('App failed to start', error)
  })
