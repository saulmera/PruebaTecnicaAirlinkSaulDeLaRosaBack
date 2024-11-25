import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProduccionesService } from './producciones.service';
import { CreateProduccioneDto } from './dto/create-produccione.dto';
import { UpdateProduccioneDto } from './dto/update-produccione.dto';

@Controller('producciones')
export class ProduccionesController {
  constructor(private readonly produccionesService: ProduccionesService) {}


  @Get('calcular/:productoId')
  calcularProduccion(@Param('productoId') productoId: number) {
    return this.produccionesService.calcularProduccion(productoId);
  }

  @Post('registrar')
  registrarProduccion(
    @Body() { productoId, cantidad }: { productoId: number; cantidad: number },
  ) {
    return this.produccionesService.registrarProduccion(productoId, cantidad);
  }

  @Get('reporte-inventario')
  reporteInventario() {
    return this.produccionesService.reporteInventario();
  }
  /* @Post()
  create(@Body() createProduccioneDto: CreateProduccioneDto) {
    return this.produccionesService.create(createProduccioneDto);
  }

  @Get()
  findAll() {
    return this.produccionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produccionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProduccioneDto: UpdateProduccioneDto) {
    return this.produccionesService.update(+id, updateProduccioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produccionesService.remove(+id);
  } */
}
