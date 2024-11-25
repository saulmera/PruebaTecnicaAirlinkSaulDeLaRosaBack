import { IsArray, IsOptional, IsString } from "class-validator";


export class UpdateProductoDto {

    @IsString()
    @IsOptional()
    nombre_producto: string; 

    @IsString() 
    @IsOptional()
    descripcion: string;

    @IsArray()
    @IsOptional()
    piezas: number[]
}
