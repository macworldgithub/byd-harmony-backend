import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';

@Injectable()
export class BookingsService {
  constructor(@InjectModel(Booking.name) private bookingModel: Model<BookingDocument>) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const createdBooking = new this.bookingModel(createBookingDto);
    return createdBooking.save();
  }

  async findAll(query: any, locationId?: string): Promise<any> {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter: any = { isDeleted: false };
    
    if (locationId) filter.locationId = locationId;
    if (query.status) filter.status = query.status;
    
    if (query.date) {
      const startDate = new Date(query.date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(query.date);
      endDate.setHours(23, 59, 59, 999);
      filter.scheduledAt = { $gte: startDate, $lte: endDate };
    }

    const [data, total] = await Promise.all([
      this.bookingModel.find(filter)
        .populate('customerId', 'firstName lastName phone email')
        .populate('vehicleId', 'make model year rego vin')
        .populate('locationId', 'name')
        .skip(skip)
        .limit(limit)
        .exec(),
      this.bookingModel.countDocuments(filter).exec(),
    ]);

    return { data, meta: { total, page, limit } };
  }

  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingModel.findById(id)
      .populate('customerId')
      .populate('vehicleId')
      .populate('locationId')
      .exec();
      
    if (!booking) {
      throw new NotFoundException(`Booking #${id} not found`);
    }
    return booking;
  }

  async update(id: string, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const existingBooking = await this.bookingModel.findByIdAndUpdate(id, updateBookingDto, { new: true }).exec();
    if (!existingBooking) {
      throw new NotFoundException(`Booking #${id} not found`);
    }
    return existingBooking;
  }

  async remove(id: string): Promise<Booking> {
    const booking = await this.bookingModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).exec();
    if (!booking) {
      throw new NotFoundException(`Booking #${id} not found`);
    }
    return booking;
  }
}
