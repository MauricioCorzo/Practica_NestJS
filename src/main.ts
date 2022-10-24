import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Mi API')
        .setDescription('Descripcion de la API')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('User')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    app.useGlobalPipes(new ValidationPipe()); // Para que valide los datos que nos envian cons npm i --save class-validator class-transform

    const PORT = 3000;
    await app.listen(PORT, () => {
        console.log(`Corriendo en el puerto: ${PORT}`);
    });
}
bootstrap();
