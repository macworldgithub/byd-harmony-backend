import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './schemas/customer.schema';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomersService {
  constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const createdCustomer = new this.customerModel(createCustomerDto);
    return createdCustomer.save();
  }

  async findAll(query: any, locationId?: string): Promise<any> {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter: any = { isDeleted: false };
    
    if (locationId) filter.preferredLocationId = new (require('mongoose').Types.ObjectId)(locationId);
    
    if (query.lifecycleStage) {
      filter.lifecycleStage = query.lifecycleStage;
    }
    
    if (query.search) {
      filter.$or = [
        { firstName: { $regex: query.search, $options: 'i' } },
        { lastName: { $regex: query.search, $options: 'i' } },
        { email: { $regex: query.search, $options: 'i' } },
        { phone: { $regex: query.search, $options: 'i' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.customerModel.find(filter).skip(skip).limit(limit).exec(),
      this.customerModel.countDocuments(filter).exec(),
    ]);

    return { data, meta: { total, page, limit } };
  }

  async search(q: string, locationId?: string): Promise<any[]> {
    if (!q || q.length < 2) return [];
    
    const filter: any = {
      isDeleted: false,
    };
    
    if (locationId) filter.preferredLocationId = locationId;
    
    filter.$or = [
      { firstName: { $regex: q, $options: 'i' } },
      { lastName: { $regex: q, $options: 'i' } },
      { email: { $regex: q, $options: 'i' } },
      { phone: { $regex: q, $options: 'i' } },
    ];

    return this.customerModel.find(filter, '_id firstName lastName email phone').limit(10).exec();
  }

  async findOne(id: string, locationId?: string): Promise<Customer> {
    const customer = await this.customerModel.findById(id).populate('preferredLocationId', 'name').exec();
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    if (locationId) {
      const preferredLocationId = (customer.preferredLocationId as any)?._id ? String((customer.preferredLocationId as any)._id) : String(customer.preferredLocationId ?? '');
      if (!customer.preferredLocationId || preferredLocationId !== String(locationId)) {
        throw new NotFoundException(`Customer #${id} not found`);
      }
    }
    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const existingCustomer = await this.customerModel.findByIdAndUpdate(id, updateCustomerDto, { new: true }).exec();
    if (!existingCustomer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return existingCustomer;
  }

  async remove(id: string): Promise<Customer> {
    const customer = await this.customerModel.findByIdAndDelete(id).exec();
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }
}
