import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle, VehicleDocument } from './schemas/vehicle.schema';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(@InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const createdVehicle = new this.vehicleModel(createVehicleDto);
    return createdVehicle.save();
  }

  async findAll(query: any): Promise<any> {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter: any = { isDeleted: false };
    
    if (query.customerId) filter.customerId = query.customerId;
    if (query.status) filter.status = query.status;

    const [data, total] = await Promise.all([
      this.vehicleModel.find(filter).populate('customerId', 'firstName lastName phone').skip(skip).limit(limit).exec(),
      this.vehicleModel.countDocuments(filter).exec(),
    ]);

    return { data, meta: { total, page, limit } };
  }

  async search(query: any): Promise<any[]> {
    const q = query.q;
    const filter: any = { isDeleted: false };
    
    if (query.customerId) filter.customerId = query.customerId;

    if (q) {
      filter.$or = [
        { rego: { $regex: q, $options: 'i' } },
        { make: { $regex: q, $options: 'i' } },
        { model: { $regex: q, $options: 'i' } },
        { vin: { $regex: q, $options: 'i' } },
      ];
    }

    return this.vehicleModel.find(filter, '_id make model year rego vin customerId').limit(10).exec();
  }

  async findOne(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleModel.findById(id).populate('customerId', 'firstName lastName phone').exec();
    if (!vehicle) {
      throw new NotFoundException(`Vehicle #${id} not found`);
    }
    return vehicle;
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    const current = await this.vehicleModel.findById(id).exec();
    if (!current) throw new NotFoundException(`Vehicle #${id} not found`);

    const updateData: any = { ...updateVehicleDto };
    
    if (updateVehicleDto.odometer !== undefined && updateVehicleDto.odometer !== current.odometer) {
      updateData.odometerUpdatedAt = new Date();
    }

    const existingVehicle = await this.vehicleModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    return existingVehicle as Vehicle;
  }

  async remove(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).exec();
    if (!vehicle) {
      throw new NotFoundException(`Vehicle #${id} not found`);
    }
    return vehicle;
  }
}
