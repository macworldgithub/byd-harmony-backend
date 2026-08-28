import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CustomerThread, CustomerThreadDocument } from './schemas/customer-thread.schema';
import { CreateThreadEntryDto } from './dto/customer-thread.dto';

@Injectable()
export class CustomerThreadsService {
  constructor(
    @InjectModel(CustomerThread.name)
    private readonly threadModel: Model<CustomerThreadDocument>,
  ) {}

  /**
   * Get paginated thread entries for a customer, newest first.
   */
  async findByCustomer(
    customerId: string,
    page = 1,
    limit = 50,
  ): Promise<any> {
    if (!Types.ObjectId.isValid(customerId)) {
      throw new NotFoundException(`Customer #${customerId} not found`);
    }

    const skip = (page - 1) * limit;
    const filter = { customerId: new Types.ObjectId(customerId), isDeleted: false };

    const [data, total] = await Promise.all([
      this.threadModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      this.threadModel.countDocuments(filter).exec(),
    ]);

    return {
      data: data.reverse(), // return chronological order (oldest first in the window)
      meta: { total, page, limit, pages: Math.ceil(total / limit) },
    };
  }

  /**
   * Create a new thread entry for a customer.
   */
  async create(
    customerId: string,
    dto: CreateThreadEntryDto,
    user?: any,
  ): Promise<CustomerThread> {
    if (!Types.ObjectId.isValid(customerId)) {
      throw new NotFoundException(`Customer #${customerId} not found`);
    }

    const entry = new this.threadModel({
      customerId: new Types.ObjectId(customerId),
      type: dto.type ?? 'note',
      direction: dto.direction ?? 'internal',
      subject: dto.subject,
      body: dto.body,
      attachments: dto.attachments ?? [],
      author: user
        ? {
            userId: user._id ?? user.sub ?? user.id,
            name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || user.email || 'Staff',
            role: user.role ?? '',
          }
        : { userId: null, name: 'System', role: '' },
    });

    return entry.save();
  }

  /**
   * Soft-delete a thread entry.
   */
  async remove(entryId: string): Promise<void> {
    await this.threadModel.findByIdAndUpdate(entryId, { isDeleted: true }).exec();
  }
}
