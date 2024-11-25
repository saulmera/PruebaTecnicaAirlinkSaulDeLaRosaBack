import { Producto } from "src/productos/entities/producto.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("registros_produccion")
export class Produccione {


    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=>Producto,({ nullable: false}))
    @JoinColumn()
    producto:Producto

    @Column()
    cantidadProducida: number;

  @Column( { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaProduccion: Date;

  @Column('json')
  piezasUtilizadas: Array<{ piezaId: number; cantidad: number }>;





}
