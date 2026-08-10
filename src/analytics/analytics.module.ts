import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from '../customers/schemas/customer.schema';
import { Vehicle, VehicleSchema } from '../vehicles/schemas/vehicle.schema';
import { Booking, BookingSchema } from '../bookings/schemas/booking.schema';
import { JobCard, JobCardSchema } from '../job-cards/schemas/job-card.schema';
import { Location, LocationSchema } from '../locations/schemas/location.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: Vehicle.name, schema: VehicleSchema },
      { name: Booking.name, schema: BookingSchema },
      { name: JobCard.name, schema: JobCardSchema },
      { name: Location.name, schema: LocationSchema },
    ]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
