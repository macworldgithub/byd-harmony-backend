import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleDeliveriesService } from './schedule-deliveries.service';
import { ScheduleDeliveriesController } from './schedule-deliveries.controller';
import { ScheduleDelivery, ScheduleDeliverySchema } from './schemas/schedule-delivery.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ScheduleDelivery.name, schema: ScheduleDeliverySchema },
    ]),
  ],
  controllers: [ScheduleDeliveriesController],
  providers: [ScheduleDeliveriesService],
})
export class ScheduleDeliveriesModule {}
