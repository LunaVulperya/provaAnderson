"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const rxjs_1 = require("rxjs");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_dto_1 = require("./user.dto");
let UserController = class UserController {
    userClient;
    constructor(userClient) {
        this.userClient = userClient;
    }
    async create_user(dto) {
        const result = await (0, rxjs_1.firstValueFrom)(this.userClient.send({ cmd: "create_user" }, dto));
        if (result.error)
            throw new common_1.HttpException(result.error, common_1.HttpStatus.BAD_REQUEST);
        return { message: "Usuário criado com sucesso!", data: result };
    }
    async get_all_users() {
        return (0, rxjs_1.firstValueFrom)(this.userClient.send({ cmd: "get_all_users" }, {}));
    }
    async get_user(id) {
        const result = await (0, rxjs_1.firstValueFrom)(this.userClient.send({ cmd: "get_user" }, +id));
        if (result.error)
            throw new common_1.HttpException(result.error, common_1.HttpStatus.NOT_FOUND);
        return result;
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)("create"),
    (0, swagger_1.ApiOperation)({ summary: "Criar um novo usuário" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Usuário criado com sucesso." }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "CPF já cadastrado." }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create_user", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Listar todos os usuários" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Lista de usuários." }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "get_all_users", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Buscar usuário por ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Usuário encontrado." }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Usuário não encontrado." }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "get_user", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)("Usuários"),
    (0, common_1.Controller)("user"),
    __param(0, (0, common_1.Inject)("USER_SERVICE")),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], UserController);
//# sourceMappingURL=user.controller.js.map