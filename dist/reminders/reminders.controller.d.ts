import { RemindersService } from './reminders.service';
import { CreateReminderDto, UpdateReminderDto } from './dto/reminder.dto';
export declare class RemindersController {
    private readonly remindersService;
    constructor(remindersService: RemindersService);
    create(createReminderDto: CreateReminderDto): Promise<import("./schemas/reminder.schema").Reminder>;
    findAll(query: any): Promise<any>;
    findOne(id: string): Promise<import("./schemas/reminder.schema").Reminder>;
    update(id: string, updateReminderDto: UpdateReminderDto): Promise<import("./schemas/reminder.schema").Reminder>;
    remove(id: string): Promise<import("./schemas/reminder.schema").Reminder>;
}
