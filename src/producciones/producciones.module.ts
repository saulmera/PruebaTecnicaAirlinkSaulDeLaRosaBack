import { Module } from '@nestjs/common';
import { ProduccionesService } from './producciones.service';
import { ProduccionesController } from './producciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produccione } from './entities/produccione.entity';
import { ProductosModule } from 'src/productos/productos.module';
import { PiezasModule } from 'src/piezas/piezas.module';

@Module({
  imports: [TypeOrmModule.forFeature([Produccione]),ProductosModule,PiezasModule],
  controllers: [ProduccionesController],
  providers: [ProduccionesService],
})
export class ProduccionesModule {}
