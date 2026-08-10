"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemindersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const reminder_schema_1 = require("./schemas/reminder.schema");
let RemindersService = class RemindersService {
    reminderModel;
    constructor(reminderModel) {
        this.reminderModel = reminderModel;
    }
    async create(createReminderDto) {
        const createdReminder = new this.reminderModel(createReminderDto);
        return createdReminder.save();
    }
    async findAll(query) {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 20;
        const skip = (page - 1) * limit;
        const filter = {};
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
    async findOne(id) {
        const reminder = await this.reminderModel.findById(id).exec();
        if (!reminder) {
            throw new common_1.NotFoundException(`Reminder #${id} not found`);
        }
        return reminder;
    }
    async update(id, updateReminderDto) {
        const existingReminder = await this.reminderModel.findByIdAndUpdate(id, updateReminderDto, { new: true }).exec();
        if (!existingReminder) {
            throw new common_1.NotFoundException(`Reminder #${id} not found`);
        }
        return existingReminder;
    }
    async remove(id) {
        const reminder = await this.reminderModel.findByIdAndDelete(id).exec();
        if (!reminder) {
            throw new common_1.NotFoundException(`Reminder #${id} not found`);
        }
        return reminder;
    }
};
exports.RemindersService = RemindersService;
exports.RemindersService = RemindersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(reminder_schema_1.Reminder.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RemindersService);
//# sourceMappingURL=reminders.service.js.map