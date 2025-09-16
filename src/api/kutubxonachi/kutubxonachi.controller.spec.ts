import { Test, TestingModule } from '@nestjs/testing';
import { KutubxonachiController } from './kutubxonachi.controller';
import { KutubxonachiService } from './kutubxonachi.service';

describe('KutubxonachiController', () => {
  let controller: KutubxonachiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KutubxonachiController],
      providers: [KutubxonachiService],
    }).compile();

    controller = module.get<KutubxonachiController>(KutubxonachiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
