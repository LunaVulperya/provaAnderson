import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { UserService } from "./user.service";
import { UserDTO, LoginDTO } from "./user.dto";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: "create_user" })
  create_user(dto: UserDTO) {
    return this.userService.create_user(dto);
  }

  @MessagePattern({ cmd: "get_user" })
  get_user(id: number) {
    return this.userService.get_user(id);
  }

  @MessagePattern({ cmd: "get_all_users" })
  get_all_users() {
    return this.userService.get_all_users();
  }

  @MessagePattern({ cmd: "login" })
  login(dto: LoginDTO) {
    return this.userService.login(dto);
  }
}
