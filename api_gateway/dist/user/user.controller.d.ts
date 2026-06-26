import { ClientProxy } from "@nestjs/microservices";
import { CreateUserDTO } from "./user.dto";
export declare class UserController {
    private userClient;
    constructor(userClient: ClientProxy);
    create_user(dto: CreateUserDTO): Promise<{
        message: string;
        data: any;
    }>;
    get_all_users(): Promise<any>;
    get_user(id: string): Promise<any>;
}
