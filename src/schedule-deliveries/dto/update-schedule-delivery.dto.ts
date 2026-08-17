import { PartialType } from '@nestjs/swagger';
import { CreateScheduleDeliveryDto } from './create-schedule-delivery.dto';

export class UpdateScheduleDeliveryDto extends PartialType(CreateScheduleDeliveryDto) {}
