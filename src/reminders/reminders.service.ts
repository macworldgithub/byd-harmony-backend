import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reminder, ReminderDocument } from './schemas/reminder.schema';
import { CreateReminderDto, UpdateReminderDto } from './dto/reminder.dto';

@Injectable()
export class RemindersService {
  constructor(@InjectModel(Reminder.name) private reminderModel: Model<ReminderDocument>) {}

  async create(createReminderDto: CreateReminderDto): Promise<Reminder> {
    const createdReminder = new this.reminderModel(createReminderDto);
    return createdReminder.save();
  }

  async findAll(query: any): Promise<any> {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter: any = {};
    
    if (query.clientId) {
      filter.clientId = parseInt(query.clientId);
    }
    
    if (query.done !== undefined) {
      filter.done = parseInt(query.done);
    }
    
    if (query.search) {
      filter.$or = [
        { title: { $regex: query.search, $options: 'i' } },
        { clientName: { $regex: query.search, $options: 'i' } }
      ];
    }

    const [data, total] = await Promise.all([
      this.reminderModel.find(filter).skip(skip).limit(limit).exec(),
      this.reminderModel.countDocuments(filter).exec(),
    ]);

    return { data, meta: { total, page, limit } };
  }

  async findOne(id: string): Promise<Reminder> {
    const reminder = await this.reminderModel.findById(id).exec();
    if (!reminder) {
      throw new NotFoundException(`Reminder #${id} not found`);
    }
    return reminder;
  }

  async update(id: string, updateReminderDto: UpdateReminderDto): Promise<Reminder> {
    const existingReminder = await this.reminderModel.findByIdAndUpdate(id, updateReminderDto, { new: true }).exec();
    if (!existingReminder) {
      throw new NotFoundException(`Reminder #${id} not found`);
    }
    return existingReminder;
  }

  async remove(id: string): Promise<Reminder> {
    const reminder = await this.reminderModel.findByIdAndDelete(id).exec();
    if (!reminder) {
      throw new NotFoundException(`Reminder #${id} not found`);
    }
    return reminder;
  }
}
