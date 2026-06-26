import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthModule } from "./auth/auth.module";
import { AuthController } from "./auth/auth.controller";
import { UserController } from "./user/user.controller";

@Module({
  imports: [
    AuthModule,
    ClientsModule.register([
      {
        name: "USER_SERVICE",
        transport: Transport.TCP,
        options: { host: "127.0.0.1", port: 3001 },
      },
    ]),
  ],
  controllers: [AuthController, UserController],
})
export class AppModule {}
