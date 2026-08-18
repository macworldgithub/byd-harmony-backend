import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { JobCard, JobCardDocument } from './schemas/job-card.schema';
import {
  CreateJobCardDto,
  UpdateJobCardDto,
  JobCardItemDto,
} from './dto/job-card.dto';

@Injectable()
export class JobCardsService {
  constructor(
    @InjectModel(JobCard.name) private jobCardModel: Model<JobCardDocument>,
  ) {}

  private async generateOrderNumber(): Promise<string> {
    const lastJob = await this.jobCardModel
      .findOne({}, 'orderNumber')
      .sort({ createdAt: -1 })
      .exec();
    let num = 1;
    if (lastJob && lastJob.orderNumber) {
      const parts = lastJob.orderNumber.split('-');
      if (parts.length === 2) {
        num = parseInt(parts[1], 10) + 1;
      }
    }
    return `BYD-${num.toString().padStart(5, '0')}`;
  }

  async create(createJobCardDto: CreateJobCardDto): Promise<JobCard> {
    const orderNumber = await this.generateOrderNumber();
    const createdJobCard = new this.jobCardModel({
      ...createJobCardDto,
      orderNumber,
    });
    return createdJobCard.save();
  }

  async findAll(query: any, locationId?: string): Promise<any> {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter: any = { isDeleted: false };

    if (locationId) filter.locationId = locationId;
    if (query.status) filter.status = query.status;
    if (query.priority) filter.priority = query.priority;

    const [data, total] = await Promise.all([
      this.jobCardModel
        .find(filter)
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

  async findOne(id: string, locationId?: string): Promise<JobCard> {
    const jobCard = await this.jobCardModel
      .findById(id)
      .populate('customerId')
      .populate('vehicleId')
      .populate('locationId')
      .populate('technicianId', 'name')
      .exec();

    if (!jobCard) {
      throw new NotFoundException(`Job Card #${id} not found`);
    }
    if (
      locationId &&
      String((jobCard.locationId as any)?._id || jobCard.locationId) !==
        String(locationId)
    ) {
      throw new NotFoundException(`Job Card #${id} not found`);
    }
    return jobCard;
  }

  async update(
    id: string,
    updateJobCardDto: UpdateJobCardDto,
  ): Promise<JobCard> {
    const current = await this.jobCardModel.findById(id).exec();
    if (!current) throw new NotFoundException(`Job Card #${id} not found`);

    const updateData: any = { ...updateJobCardDto };

    if (updateData.status) {
      if (updateData.status === 'in_progress' && !current.startedAt) {
        updateData.startedAt = new Date();
      }
      if (updateData.status === 'completed' && !current.completedAt) {
        updateData.completedAt = new Date();
      }
    }

    const updatedJobCard = await this.jobCardModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    return updatedJobCard as JobCard;
  }

  async remove(id: string): Promise<JobCard> {
    const jobCard = await this.jobCardModel.findByIdAndDelete(id).exec();
    if (!jobCard) {
      throw new NotFoundException(`Job Card #${id} not found`);
    }
    return jobCard;
  }

  // Items embedded array
  async addItem(id: string, itemDto: JobCardItemDto): Promise<JobCard> {
    const jobCard = await this.jobCardModel.findById(id).exec();
    if (!jobCard) throw new NotFoundException(`Job Card #${id} not found`);

    const newItem: any = {
      _id: new Types.ObjectId(),
      ...itemDto,
      quantity: itemDto.quantity || 1,
      totalCost: (itemDto.quantity || 1) * itemDto.unitCost,
      createdAt: new Date(),
    };

    jobCard.items.push(newItem);
    this.recalculateTotals(jobCard);

    return jobCard.save();
  }

  async updateItem(id: string, itemId: string, itemDto: any): Promise<JobCard> {
    const jobCard = await this.jobCardModel.findById(id).exec();
    if (!jobCard) throw new NotFoundException(`Job Card #${id} not found`);

    const item = jobCard.items.find((i: any) => i._id.toString() === itemId);
    if (!item) throw new NotFoundException(`Item #${itemId} not found`);

    if (itemDto.description) item.description = itemDto.description;
    if (itemDto.quantity !== undefined) item.quantity = itemDto.quantity;
    if (itemDto.unitCost !== undefined) item.unitCost = itemDto.unitCost;
    if (itemDto.partNumber) item.partNumber = itemDto.partNumber;

    item.totalCost = item.quantity * item.unitCost;

    this.recalculateTotals(jobCard);
    return jobCard.save();
  }

  async removeItem(id: string, itemId: string): Promise<JobCard> {
    const jobCard = await this.jobCardModel.findById(id).exec();
    if (!jobCard) throw new NotFoundException(`Job Card #${id} not found`);

    jobCard.items = jobCard.items.filter(
      (i: any) => i._id.toString() !== itemId,
    );
    this.recalculateTotals(jobCard);
    return jobCard.save();
  }

  private recalculateTotals(jobCard: any) {
    let labourTotal = 0;
    let partsTotal = 0;

    for (const item of jobCard.items) {
      if (item.type === 'labour') {
        labourTotal += item.totalCost;
      } else if (
        item.type === 'parts' ||
        item.type === 'sublet' ||
        item.type === 'sundry'
      ) {
        partsTotal += item.totalCost;
      }
    }

    jobCard.labourTotal = labourTotal;
    jobCard.partsTotal = partsTotal;
  }
}
