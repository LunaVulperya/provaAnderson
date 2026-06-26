import { UserService } from "./user.service";
import { UserDTO, LoginDTO } from "./user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create_user(dto: UserDTO): Promise<any>;
    get_user(id: number): Promise<any>;
    get_all_users(): Promise<any[]>;
    login(dto: LoginDTO): Promise<{
        error: string;
        access_token?: undefined;
    } | {
        access_token: string;
        error?: undefined;
    }>;
}
