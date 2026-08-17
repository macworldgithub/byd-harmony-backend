import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateScheduleDeliveryDto } from './dto/create-schedule-delivery.dto';
import { UpdateScheduleDeliveryDto } from './dto/update-schedule-delivery.dto';
import { ScheduleDelivery, ScheduleDeliveryDocument } from './schemas/schedule-delivery.schema';

@Injectable()
export class ScheduleDeliveriesService {
  constructor(
    @InjectModel(ScheduleDelivery.name) private scheduleDeliveryModel: Model<ScheduleDeliveryDocument>,
  ) {}

  async create(createScheduleDeliveryDto: CreateScheduleDeliveryDto): Promise<ScheduleDelivery> {
    const created = new this.scheduleDeliveryModel(createScheduleDeliveryDto);
    return created.save();
  }

  async findAll(locationId?: string): Promise<ScheduleDelivery[]> {
    const filter = locationId ? { locationId } : {};
    return this.scheduleDeliveryModel.find(filter).exec();
  }

  async findOne(id: string): Promise<ScheduleDelivery> {
    const delivery = await this.scheduleDeliveryModel.findById(id).exec();
    if (!delivery) {
      throw new NotFoundException(`ScheduleDelivery #${id} not found`);
    }
    return delivery;
  }

  async update(id: string, updateScheduleDeliveryDto: UpdateScheduleDeliveryDto): Promise<ScheduleDelivery> {
    const existing = await this.scheduleDeliveryModel
      .findByIdAndUpdate(id, updateScheduleDeliveryDto, { new: true })
      .exec();
    if (!existing) {
      throw new NotFoundException(`ScheduleDelivery #${id} not found`);
    }
    return existing;
  }

  async remove(id: string): Promise<ScheduleDelivery> {
    const deleted = await this.scheduleDeliveryModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`ScheduleDelivery #${id} not found`);
    }
    return deleted;
  }
}
