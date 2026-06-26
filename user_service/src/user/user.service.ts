import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User } from "./user.entity";
import { UserDTO, LoginDTO } from "./user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async create_user(dto: UserDTO) {
    const existing = await this.userModel.findOne({ where: { cpf: dto.cpf } });
    if (existing) return { error: "CPF já cadastrado." };

    const hashed = await bcrypt.hash(dto.senha, 10);
    const user = await this.userModel.create({ ...dto, senha: hashed });
    const { senha, ...result } = user.toJSON();
    return result;
  }

  async get_user(id: number) {
    const user = await this.userModel.findByPk(id);
    if (!user) return { error: "Usuário não encontrado." };
    const { senha, ...result } = user.toJSON();
    return result;
  }

  async get_all_users() {
    const users = await this.userModel.findAll();
    return users.map((u) => {
      const { senha, ...rest } = u.toJSON();
      return rest;
    });
  }

  async login(dto: LoginDTO) {
    const user = await this.userModel.findOne({ where: { matricula: dto.matricula } });
    if (!user) return { error: "Usuário não encontrado." };

    const valid = await bcrypt.compare(dto.senha, user.senha);
    if (!valid) return { error: "Senha inválida." };

    const payload = { sub: user.id, matricula: user.matricula };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
