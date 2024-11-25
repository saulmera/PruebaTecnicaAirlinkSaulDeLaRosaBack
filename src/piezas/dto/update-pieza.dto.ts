
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePiezaDto {
    @IsString()
    @IsOptional()
    nombre_pieza: string;
    @IsString()
    @IsOptional()
    descripcion: string;
    @IsNumber()
    @IsOptional()
    precio: number;
    @IsNumber()
    @IsOptional()
    stock: number;
    @IsBoolean()
    @IsOptional()
    isActive: boolean;
}
