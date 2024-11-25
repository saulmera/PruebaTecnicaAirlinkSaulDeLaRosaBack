import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePiezaDto } from './dto/create-pieza.dto';
import { UpdatePiezaDto } from './dto/update-pieza.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pieza } from './entities/pieza.entity';

@Injectable()
export class PiezasService {

constructor(
  @InjectRepository(Pieza) private readonly piezaRepository: Repository<Pieza>,
) {}

 async create(createPiezaDto: CreatePiezaDto) {

  try {
    const newpieza = this.piezaRepository.create(createPiezaDto);
    await this.piezaRepository.save(newpieza);
  } catch (error) {
    throw new BadRequestException(error.message);
  }
    return {
      ok: true,
      message: 'Pieza Creada',
    };
  }

async  findAll() {
    return await this.piezaRepository.find({
      where: { isActive: true },
    });
  }

async  findOne(id: number) {
    const pieza = await this.piezaRepository.findOne({
      where: { id, isActive: true },
});

    if (!pieza) {
      throw new BadRequestException('Pieza no encontrada');
    }
    return pieza;
  }

 async update(id: number, updatePiezaDto: UpdatePiezaDto) {
    const pieza = await this.findOne(id);
    if (!pieza) {
      throw new BadRequestException('Pieza no exixte para actualizar');
    }
    await this.piezaRepository.update(id, updatePiezaDto);
    return {
      ok: true,
      message: `la pieza ${pieza.nombre_pieza} ha sido actualizada`,
    };
  }

 async remove(id: number) {
  const pieza = await this.findOne(id);
  if (!pieza) {
    throw new BadRequestException('Pieza no exixte para borrar');
  }
  pieza.isActive = false;
  await this.piezaRepository.save(pieza);

  
    return {
      ok: true,
      message: `la pieza ${pieza.nombre_pieza} ha sido eliminada`,
    }
  }
}
