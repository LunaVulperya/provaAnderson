import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  });

  const config = new DocumentBuilder()
    .setTitle("API Gateway - Microserviços")
    .setDescription("Endpoints de autenticação e usuários")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(3000);
  console.log("API Gateway rodando em http://localhost:3000");
  console.log("Swagger em http://localhost:3000/api/docs");
}
bootstrap();
