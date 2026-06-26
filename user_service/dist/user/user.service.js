"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const user_entity_1 = require("./user.entity");
let UserService = class UserService {
    userModel;
    jwtService;
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async create_user(dto) {
        const existing = await this.userModel.findOne({ where: { cpf: dto.cpf } });
        if (existing)
            return { error: "CPF já cadastrado." };
        const hashed = await bcrypt.hash(dto.senha, 10);
        const user = await this.userModel.create({ ...dto, senha: hashed });
        const { senha, ...result } = user.toJSON();
        return result;
    }
    async get_user(id) {
        const user = await this.userModel.findByPk(id);
        if (!user)
            return { error: "Usuário não encontrado." };
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
    async login(dto) {
        const user = await this.userModel.findOne({ where: { matricula: dto.matricula } });
        if (!user)
            return { error: "Usuário não encontrado." };
        const valid = await bcrypt.compare(dto.senha, user.senha);
        if (!valid)
            return { error: "Senha inválida." };
        const payload = { sub: user.id, matricula: user.matricula };
        const token = this.jwtService.sign(payload);
        return { access_token: token };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map