import { Test, TestingModule } from '@nestjs/testing';
import { ProduccionesService } from './producciones.service';

describe('ProduccionesService', () => {
  let service: ProduccionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProduccionesService],
    }).compile();

    service = module.get<ProduccionesService>(ProduccionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
