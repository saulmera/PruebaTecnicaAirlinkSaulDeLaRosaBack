import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Pieza } from 'src/piezas/entities/pieza.entity';
import { PiezasModule } from 'src/piezas/piezas.module';

@Module({
  imports: [TypeOrmModule.forFeature([Producto]),PiezasModule],
  controllers: [ProductosController],
  providers: [ProductosService],
  exports:[TypeOrmModule]
})
export class ProductosModule {}
