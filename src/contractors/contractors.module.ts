import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContractorsService } from './contractors.service';
import { ContractorsController } from './contractors.controller';
import { Contractor, ContractorSchema } from './schemas/contractor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Contractor.name, schema: ContractorSchema },
    ]),
  ],
  controllers: [ContractorsController],
  providers: [ContractorsService],
})
export class ContractorsModule {}
