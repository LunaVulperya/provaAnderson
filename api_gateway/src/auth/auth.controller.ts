import { Body, Controller, HttpException, HttpStatus, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { firstValueFrom } from "rxjs";
import { LoginDTO } from "../user/user.dto";

@ApiTags("Autenticação")
@Controller("auth")
export class AuthController {
  constructor(@Inject("USER_SERVICE") private userClient: ClientProxy) {}

  @Post("login")
  @ApiOperation({ summary: "Fazer login e obter JWT" })
  @ApiResponse({ status: 200, description: "Token JWT gerado." })
  @ApiResponse({ status: 401, description: "Credenciais inválidas." })
  async login(@Body() dto: LoginDTO) {
    const result = await firstValueFrom(
      this.userClient.send({ cmd: "login" }, dto),
    );
    if (result.error) throw new HttpException(result.error, HttpStatus.UNAUTHORIZED);
    return result;
  }
}
