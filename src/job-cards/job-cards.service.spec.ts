import { Test, TestingModule } from '@nestjs/testing';
import { JobCardsService } from './job-cards.service';

describe('JobCardsService', () => {
  let service: JobCardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobCardsService],
    }).compile();

    service = module.get<JobCardsService>(JobCardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
