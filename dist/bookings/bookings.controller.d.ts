import { BookingsService } from './bookings.service';
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    create(createBookingDto: CreateBookingDto): Promise<import("./schemas/booking.schema").Booking>;
    findAll(query: any): Promise<any>;
    findOne(id: string): Promise<import("./schemas/booking.schema").Booking>;
    update(id: string, updateBookingDto: UpdateBookingDto): Promise<import("./schemas/booking.schema").Booking>;
    remove(id: string): Promise<import("./schemas/booking.schema").Booking>;
}
