import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "8h" },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
