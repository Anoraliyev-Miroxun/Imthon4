import { DocumentBuilder } from '@nestjs/swagger';

export const configSwagger = new DocumentBuilder()
  .setTitle('Nasiya APP')
  .setVersion('1.0.0')
  .addBearerAuth({
    type: 'http',
    scheme: 'Bearer',
    in: 'Header',
  })
  .build();
