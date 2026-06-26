import { ConfigService } from "@nestjs/config";
import { SequelizeModuleOptions, SequelizeOptionsFactory } from "@nestjs/sequelize";
export declare class DatabaseConfig implements SequelizeOptionsFactory {
    private configService;
    constructor(configService: ConfigService);
    createSequelizeOptions(): SequelizeModuleOptions;
}
