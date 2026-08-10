import { Module } from '@nestjs/common';
import { JobCardsController } from './job-cards.controller';
import { JobCardsService } from './job-cards.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JobCard, JobCardSchema } from './schemas/job-card.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: JobCard.name, schema: JobCardSchema }])],
  controllers: [JobCardsController],
  providers: [JobCardsService],
})
export class JobCardsModule {}
