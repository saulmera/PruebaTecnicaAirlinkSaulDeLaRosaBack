import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePiezaDto {
    @IsString()
    nombre_pieza: string;

    @IsString()
    descripcion: string;

    @IsNumber()
    precio: number;

    @IsNumber()
    stock: number

    @IsBoolean()
    @IsOptional()
    isActive: boolean;
}
