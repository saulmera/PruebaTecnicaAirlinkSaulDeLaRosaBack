import { IS_ARRAY, IsArray, IsString } from "class-validator";

export class CreateProductoDto {

    @IsString()
    nombre_producto: string;

    @IsString()
    descripcion: string;

    @IsArray()
    piezas: number[]

}
