import { Pieza } from "src/piezas/entities/pieza.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "productos",})
export class Producto {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    nombre_producto: string;

    @Column()
    descripcion: string;

    @ManyToMany(()=> Pieza, (pieza) => pieza.productos,{
        cascade: true,
        onDelete: "CASCADE",
    },)
    @JoinTable({name: "piezas_productos"})
    piezas: Pieza[]

    @Column({default: true})
    isActive: boolean

}
