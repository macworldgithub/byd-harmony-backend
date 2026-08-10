import { Model } from 'mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';
export declare class BookingsService {
    private bookingModel;
    constructor(bookingModel: Model<BookingDocument>);
    create(createBookingDto: CreateBookingDto): Promise<Booking>;
    findAll(query: any): Promise<any>;
    findOne(id: string): Promise<Booking>;
    update(id: string, updateBookingDto: UpdateBookingDto): Promise<Booking>;
    remove(id: string): Promise<Booking>;
}
