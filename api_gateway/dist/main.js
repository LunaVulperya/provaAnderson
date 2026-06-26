"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: "Content-Type, Authorization",
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle("API Gateway - Microserviços")
        .setDescription("Endpoints de autenticação e usuários")
        .setVersion("1.0")
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api/docs", app, document);
    await app.listen(3000);
    console.log("API Gateway rodando em http://localhost:3000");
    console.log("Swagger em http://localhost:3000/api/docs");
}
bootstrap();
//# sourceMappingURL=main.js.map