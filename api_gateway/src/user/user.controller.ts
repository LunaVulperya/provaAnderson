import {
  Body, Controller, Get, HttpException, HttpStatus,
  Inject, Param, Post, UseGuards,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { firstValueFrom } from "rxjs";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateUserDTO } from "./user.dto";

@ApiTags("Usuários")
@Controller("user")
export class UserController {
  constructor(@Inject("USER_SERVICE") private userClient: ClientProxy) {}

  @Post("create")
  @ApiOperation({ summary: "Criar um novo usuário" })
  @ApiResponse({ status: 201, description: "Usuário criado com sucesso." })
  @ApiResponse({ status: 400, description: "CPF já cadastrado." })
  async create_user(@Body() dto: CreateUserDTO) {
    const result = await firstValueFrom(
      this.userClient.send({ cmd: "create_user" }, dto),
    );
    if (result.error) throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
    return { message: "Usuário criado com sucesso!", data: result };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Listar todos os usuários" })
  @ApiResponse({ status: 200, description: "Lista de usuários." })
  async get_all_users() {
    return firstValueFrom(this.userClient.send({ cmd: "get_all_users" }, {}));
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Buscar usuário por ID" })
  @ApiResponse({ status: 200, description: "Usuário encontrado." })
  @ApiResponse({ status: 404, description: "Usuário não encontrado." })
  async get_user(@Param("id") id: string) {
    const result = await firstValueFrom(
      this.userClient.send({ cmd: "get_user" }, +id),
    );
    if (result.error) throw new HttpException(result.error, HttpStatus.NOT_FOUND);
    return result;
  }
}
