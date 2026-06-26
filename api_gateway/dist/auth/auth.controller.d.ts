import { ClientProxy } from "@nestjs/microservices";
import { LoginDTO } from "../user/user.dto";
export declare class AuthController {
    private userClient;
    constructor(userClient: ClientProxy);
    login(dto: LoginDTO): Promise<any>;
}
