import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { In, Repository } from 'typeorm';
import { Pieza } from 'src/piezas/entities/pieza.entity';

@Injectable()
export class ProductosService {

  constructor(
    @InjectRepository(Producto) private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Pieza) private readonly piezaRepository: Repository<Pieza>,
  ) {}
  async create(createProductoDto: CreateProductoDto) {

    try {
      const {piezas, ...rest}=createProductoDto
      const dbpieza = await this.piezaRepository.findBy({ id: In(piezas) }); 

      console.log( dbpieza);
      const newproducto = this.productoRepository.create({...rest, piezas: dbpieza});
     var dbresponse = await this.productoRepository.save(newproducto);
    } catch (error) {
      
    }
    

    return {
      ok: true,
      message: 'Producto Creado',
      data: dbresponse
    };
  }

 async findAll() {
    return await this.productoRepository.find({relations: ['piezas']});
  }

 async findOne(id: number) {
    const producto = await this.productoRepository.findOne({
      where: { id, isActive: true },
      relations: ['piezas'],
    })
    return producto
  }

 async update(id: number, updateProductoDto: UpdateProductoDto) {
    try {
      // Buscar el producto existente
      const producto = await this.productoRepository.findOne({
        where: { id },
        relations: ['piezas'], // Incluye las relaciones para poder manipularlas
      });
  
      if (!producto) {
        throw new BadRequestException('Producto no existe para actualizar');
      }
  
      // Separar las piezas del resto de los campos
      const { piezas, ...rest } = updateProductoDto;
  
      // Actualizar los campos directos del producto
      Object.assign(producto, rest);
  
      if (piezas && piezas.length > 0) {
        // Buscar las piezas en la base de datos
        const dbPiezas = await this.piezaRepository.findBy({ id: In(piezas) });
  
        if (dbPiezas.length !== piezas.length) {
          throw new BadRequestException('Una o más piezas no existen');
        }
  
        // Actualizar la relación Many-to-Many (piezas)
        producto.piezas = dbPiezas;
      }
  
      // Guardar el producto con las relaciones actualizadas
      await this.productoRepository.save(producto);
  
      return {
        ok: true,
        message: 'Producto actualizado',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  
 async remove(id: number) {

  const producto=await this.findOne(id)

  if(!producto){
    throw new BadRequestException('Producto no exixte para borrar');
  }

  (await producto).isActive=false
 
  await this.productoRepository.save(producto)
    return {
      ok: true,
      message: 'Producto eliminado',
    }
  }
}
