import { NestFactory } from '@nestjs/core'

import { AppModule } from '@/modules/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(process.env.PORT ?? 8080)
}

bootstrap()
  .then(() => {
    console.log(
      `Application is running on: http://localhost:${process.env.PORT ?? 8080}`
    )
  })
  .catch(error => {
    console.error(error)
  })
