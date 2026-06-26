import { Model } from "sequelize-typescript";
export declare class User extends Model {
    id: number;
    nome: string;
    cpf: string;
    telefone: string;
    matricula: string;
    senha: string;
}
