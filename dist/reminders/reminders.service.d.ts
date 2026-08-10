import { Model } from 'mongoose';
import { Reminder, ReminderDocument } from './schemas/reminder.schema';
import { CreateReminderDto, UpdateReminderDto } from './dto/reminder.dto';
export declare class RemindersService {
    private reminderModel;
    constructor(reminderModel: Model<ReminderDocument>);
    create(createReminderDto: CreateReminderDto): Promise<Reminder>;
    findAll(query: any): Promise<any>;
    findOne(id: string): Promise<Reminder>;
    update(id: string, updateReminderDto: UpdateReminderDto): Promise<Reminder>;
    remove(id: string): Promise<Reminder>;
}
