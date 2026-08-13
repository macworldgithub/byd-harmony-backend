import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location, LocationDocument } from './schemas/location.schema';
import { CreateLocationDto, UpdateLocationDto } from './dto/location.dto';

@Injectable()
export class LocationsService {
  constructor(@InjectModel(Location.name) private locationModel: Model<LocationDocument>) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const createdLocation = new this.locationModel(createLocationDto);
    return createdLocation.save();
  }

  async findAll(query: any): Promise<Location[]> {
    const filter: any = { isActive: { $ne: false } };
    if (query.isActive !== undefined) filter.isActive = query.isActive === 'true';
    if (query.type) filter.type = query.type;

    return this.locationModel.find(filter).exec();
  }

  async getDropdown(): Promise<any[]> {
    return this.locationModel.find({ isActive: true }, '_id name type').exec();
  }

  async findOne(id: string): Promise<Location> {
    const location = await this.locationModel.findById(id).exec();
    if (!location) {
      throw new NotFoundException(`Location #${id} not found`);
    }
    return location;
  }

  async update(id: string, updateLocationDto: UpdateLocationDto): Promise<Location> {
    const existingLocation = await this.locationModel.findByIdAndUpdate(id, updateLocationDto, { new: true }).exec();
    if (!existingLocation) {
      throw new NotFoundException(`Location #${id} not found`);
    }
    return existingLocation;
  }

  async remove(id: string): Promise<Location> {
    const location = await this.locationModel.findByIdAndDelete(id).exec();
    if (!location) {
      throw new NotFoundException(`Location #${id} not found`);
    }
    return location;
  }
}
