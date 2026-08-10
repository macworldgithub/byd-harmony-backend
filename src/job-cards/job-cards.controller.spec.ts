import { Test, TestingModule } from '@nestjs/testing';
import { JobCardsController } from './job-cards.controller';

describe('JobCardsController', () => {
  let controller: JobCardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobCardsController],
    }).compile();

    controller = module.get<JobCardsController>(JobCardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
