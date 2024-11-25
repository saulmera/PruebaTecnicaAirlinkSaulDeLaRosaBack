import { Module } from '@nestjs/common';
import { PiezasService } from './piezas.service';
import { PiezasController } from './piezas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pieza } from './entities/pieza.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pieza])],
  controllers: [PiezasController],
  providers: [PiezasService],
  exports: [TypeOrmModule],
})
export class PiezasModule {}
