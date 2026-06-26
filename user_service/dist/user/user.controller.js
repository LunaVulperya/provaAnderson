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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./user.dto");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    create_user(dto) {
        return this.userService.create_user(dto);
    }
    get_user(id) {
        return this.userService.get_user(id);
    }
    get_all_users() {
        return this.userService.get_all_users();
    }
    login(dto) {
        return this.userService.login(dto);
    }
};
exports.UserController = UserController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "create_user" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDTO]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create_user", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "get_user" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "get_user", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "get_all_users" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "get_all_users", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "login" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.LoginDTO]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map