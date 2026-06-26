import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
  @ApiProperty({ example: "João Silva" })
  nome!: string;

  @ApiProperty({ example: "123.456.789-00" })
  cpf!: string;

  @ApiProperty({ example: "(44) 99999-0000" })
  telefone!: string;

  @ApiProperty({ example: "MAT2024001" })
  matricula!: string;

  @ApiProperty({ example: "senha123" })
  senha!: string;
}

export class LoginDTO {
  @ApiProperty({ example: "MAT2024001" })
  matricula!: string;

  @ApiProperty({ example: "senha123" })
  senha!: string;
}
