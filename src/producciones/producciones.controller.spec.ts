import { Test, TestingModule } from '@nestjs/testing';
import { ProduccionesController } from './producciones.controller';
import { ProduccionesService } from './producciones.service';

describe('ProduccionesController', () => {
  let controller: ProduccionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProduccionesController],
      providers: [ProduccionesService],
    }).compile();

    controller = module.get<ProduccionesController>(ProduccionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
