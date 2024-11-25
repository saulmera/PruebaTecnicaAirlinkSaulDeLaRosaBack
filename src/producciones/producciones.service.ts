import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProduccioneDto } from './dto/create-produccione.dto';
import { UpdateProduccioneDto } from './dto/update-produccione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/productos/entities/producto.entity';
import { Pieza } from 'src/piezas/entities/pieza.entity';
import { Produccione } from './entities/produccione.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProduccionesService {

  constructor(
    @InjectRepository(Producto) private readonly productoRepo: Repository<Producto>,
    @InjectRepository(Pieza) private readonly piezaRepo: Repository<Pieza>,
    @InjectRepository(Produccione) private readonly registroRepo: Repository<Produccione>,
  ) { }

  async calcularProduccion(productoId: number) {
    const producto = await this.productoRepo.findOne({
      where: { id: productoId, isActive: true },
      relations: ['piezas'],
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${productoId} no encontrado.`);
    }

    let maxCantidad = Infinity;

    const piezasFaltantes = producto.piezas.map((pieza) => {
      const necesarioPorUnidad = pieza.precio; 
      const posibleFabricacion = Math.floor(pieza.stock / necesarioPorUnidad);

      maxCantidad = Math.min(maxCantidad, posibleFabricacion);

      return { pieza, necesarioPorUnidad, posibleFabricacion };
    });

    return { maxCantidad: Math.max(0, maxCantidad), piezasFaltantes };
  }

  
  async registrarProduccion(productoId: number, cantidad: number) {
    const { maxCantidad, piezasFaltantes } = await this.calcularProduccion(productoId);

    if (cantidad > maxCantidad) {
      throw new BadRequestException(`Cantidad solicitada excede la capacidad máxima (${maxCantidad}).`);
    }

    const producto = await this.productoRepo.findOne({
      where: { id: productoId, isActive: true },
      relations: ['piezas'],
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${productoId} no encontrado.`);
    }

    const piezasUtilizadas = piezasFaltantes.map(({ pieza, necesarioPorUnidad }) => {
      pieza.stock -= necesarioPorUnidad * cantidad;
      return { id: pieza.id, nombre_pieza: pieza.nombre_pieza, cantidad: necesarioPorUnidad * cantidad };
    });

    await this.piezaRepo.save(producto.piezas);

    const registro = this.registroRepo.create({
      producto,
      cantidadProducida: cantidad,
      piezasUtilizadas,
      fechaProduccion: new Date(),
    });

    await this.registroRepo.save(registro);

    return {
      mensaje: `Se registró la producción de ${cantidad} unidades de "${producto.nombre_producto}".`,
    };
  }

  
  async reporteInventario() {
    const piezas = await this.piezaRepo.find({ where: { isActive: true } });

    return { piezas };
  }
}
 
 

