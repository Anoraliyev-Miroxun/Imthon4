import { Test, TestingModule } from '@nestjs/testing';
import { KutubxonachiService } from './kutubxonachi.service';

describe('KutubxonachiService', () => {
  let service: KutubxonachiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KutubxonachiService],
    }).compile();

    service = module.get<KutubxonachiService>(KutubxonachiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
