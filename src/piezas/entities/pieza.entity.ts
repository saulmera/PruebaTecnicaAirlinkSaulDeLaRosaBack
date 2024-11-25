import { Producto } from "src/productos/entities/producto.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('piezas')
export class Pieza {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre_pieza: string;

    @Column()
    precio: number;

    @Column()    
    stock: number;

    @Column()
    descripcion: string;

    @Column({ default: true })
    isActive: boolean;

    @ManyToMany(() => Producto, (producto) => producto.piezas)
    productos: Producto[];
}
