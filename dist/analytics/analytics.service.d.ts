import { Model } from 'mongoose';
import { CustomerDocument } from '../customers/schemas/customer.schema';
import { VehicleDocument } from '../vehicles/schemas/vehicle.schema';
import { BookingDocument } from '../bookings/schemas/booking.schema';
import { JobCardDocument } from '../job-cards/schemas/job-card.schema';
import { LocationDocument } from '../locations/schemas/location.schema';
export declare class AnalyticsService {
    private customerModel;
    private vehicleModel;
    private bookingModel;
    private jobCardModel;
    private locationModel;
    constructor(customerModel: Model<CustomerDocument>, vehicleModel: Model<VehicleDocument>, bookingModel: Model<BookingDocument>, jobCardModel: Model<JobCardDocument>, locationModel: Model<LocationDocument>);
    getDashboard(): Promise<any>;
}
