import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerThreadsController } from './customer-threads.controller';
import { CustomerThreadsService } from './customer-threads.service';
import { CustomerThread, CustomerThreadSchema } from './schemas/customer-thread.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CustomerThread.name, schema: CustomerThreadSchema },
    ]),
  ],
  controllers: [CustomerThreadsController],
  providers: [CustomerThreadsService],
  exports: [CustomerThreadsService],
})
export class CustomerThreadsModule {}
