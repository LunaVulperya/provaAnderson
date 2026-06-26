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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const rxjs_1 = require("rxjs");
const user_dto_1 = require("../user/user.dto");
let AuthController = class AuthController {
    userClient;
    constructor(userClient) {
        this.userClient = userClient;
    }
    async login(dto) {
        const result = await (0, rxjs_1.firstValueFrom)(this.userClient.send({ cmd: "login" }, dto));
        if (result.error)
            throw new common_1.HttpException(result.error, common_1.HttpStatus.UNAUTHORIZED);
        return result;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("login"),
    (0, swagger_1.ApiOperation)({ summary: "Fazer login e obter JWT" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Token JWT gerado." }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Credenciais inválidas." }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.LoginDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)("Autenticação"),
    (0, common_1.Controller)("auth"),
    __param(0, (0, common_1.Inject)("USER_SERVICE")),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], AuthController);
//# sourceMappingURL=auth.controller.js.map