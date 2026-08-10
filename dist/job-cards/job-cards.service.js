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
exports.JobCardsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const job_card_schema_1 = require("./schemas/job-card.schema");
let JobCardsService = class JobCardsService {
    jobCardModel;
    constructor(jobCardModel) {
        this.jobCardModel = jobCardModel;
    }
    async generateOrderNumber() {
        const lastJob = await this.jobCardModel.findOne({}, 'orderNumber').sort({ createdAt: -1 }).exec();
        let num = 1;
        if (lastJob && lastJob.orderNumber) {
            const parts = lastJob.orderNumber.split('-');
            if (parts.length === 2) {
                num = parseInt(parts[1], 10) + 1;
            }
        }
        return `BYD-\${num.toString().padStart(5, '0')}`;
    }
    async create(createJobCardDto) {
        const orderNumber = await this.generateOrderNumber();
        const createdJobCard = new this.jobCardModel({
            ...createJobCardDto,
            orderNumber,
        });
        return createdJobCard.save();
    }
    async findAll(query) {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 20;
        const skip = (page - 1) * limit;
        const filter = { isDeleted: false };
        if (query.locationId)
            filter.locationId = query.locationId;
        if (query.status)
            filter.status = query.status;
        if (query.priority)
            filter.priority = query.priority;
        const [data, total] = await Promise.all([
            this.jobCardModel.find(filter)
                .populate('customerId', 'firstName lastName phone')
                .populate('vehicleId', 'make model rego vin')
                .populate('locationId', 'name')
                .skip(skip)
                .limit(limit)
                .exec(),
            this.jobCardModel.countDocuments(filter).exec(),
        ]);
        return { data, meta: { total, page, limit } };
    }
    async findOne(id) {
        const jobCard = await this.jobCardModel.findById(id)
            .populate('customerId')
            .populate('vehicleId')
            .populate('locationId')
            .populate('technicianId', 'name')
            .exec();
        if (!jobCard) {
            throw new common_1.NotFoundException(`Job Card #${id} not found`);
        }
        return jobCard;
    }
    async update(id, updateJobCardDto) {
        const current = await this.jobCardModel.findById(id).exec();
        if (!current)
            throw new common_1.NotFoundException(`Job Card #${id} not found`);
        const updateData = { ...updateJobCardDto };
        if (updateData.status) {
            if (updateData.status === 'in_progress' && !current.startedAt) {
                updateData.startedAt = new Date();
            }
            if (updateData.status === 'completed' && !current.completedAt) {
                updateData.completedAt = new Date();
            }
        }
        const updatedJobCard = await this.jobCardModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
        return updatedJobCard;
    }
    async remove(id) {
        const jobCard = await this.jobCardModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).exec();
        if (!jobCard) {
            throw new common_1.NotFoundException(`Job Card #${id} not found`);
        }
        return jobCard;
    }
    async addItem(id, itemDto) {
        const jobCard = await this.jobCardModel.findById(id).exec();
        if (!jobCard)
            throw new common_1.NotFoundException(`Job Card #${id} not found`);
        const newItem = {
            _id: new mongoose_2.Types.ObjectId(),
            ...itemDto,
            quantity: itemDto.quantity || 1,
            totalCost: (itemDto.quantity || 1) * itemDto.unitCost,
            createdAt: new Date(),
        };
        jobCard.items.push(newItem);
        this.recalculateTotals(jobCard);
        return jobCard.save();
    }
    async updateItem(id, itemId, itemDto) {
        const jobCard = await this.jobCardModel.findById(id).exec();
        if (!jobCard)
            throw new common_1.NotFoundException(`Job Card #${id} not found`);
        const item = jobCard.items.find((i) => i._id.toString() === itemId);
        if (!item)
            throw new common_1.NotFoundException(`Item #${itemId} not found`);
        if (itemDto.description)
            item.description = itemDto.description;
        if (itemDto.quantity !== undefined)
            item.quantity = itemDto.quantity;
        if (itemDto.unitCost !== undefined)
            item.unitCost = itemDto.unitCost;
        if (itemDto.partNumber)
            item.partNumber = itemDto.partNumber;
        item.totalCost = item.quantity * item.unitCost;
        this.recalculateTotals(jobCard);
        return jobCard.save();
    }
    async removeItem(id, itemId) {
        const jobCard = await this.jobCardModel.findById(id).exec();
        if (!jobCard)
            throw new common_1.NotFoundException(`Job Card #${id} not found`);
        jobCard.items = jobCard.items.filter((i) => i._id.toString() !== itemId);
        this.recalculateTotals(jobCard);
        return jobCard.save();
    }
    recalculateTotals(jobCard) {
        let labourTotal = 0;
        let partsTotal = 0;
        for (const item of jobCard.items) {
            if (item.type === 'labour') {
                labourTotal += item.totalCost;
            }
            else if (item.type === 'parts' || item.type === 'sublet' || item.type === 'sundry') {
                partsTotal += item.totalCost;
            }
        }
        jobCard.labourTotal = labourTotal;
        jobCard.partsTotal = partsTotal;
    }
};
exports.JobCardsService = JobCardsService;
exports.JobCardsService = JobCardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(job_card_schema_1.JobCard.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], JobCardsService);
//# sourceMappingURL=job-cards.service.js.map