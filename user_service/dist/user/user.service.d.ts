import { JwtService } from "@nestjs/jwt";
import { User } from "./user.entity";
import { UserDTO, LoginDTO } from "./user.dto";
export declare class UserService {
    private userModel;
    private jwtService;
    constructor(userModel: typeof User, jwtService: JwtService);
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
