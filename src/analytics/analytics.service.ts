import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from '../customers/schemas/customer.schema';
import { Vehicle, VehicleDocument } from '../vehicles/schemas/vehicle.schema';
import { Booking, BookingDocument } from '../bookings/schemas/booking.schema';
import { JobCard, JobCardDocument } from '../job-cards/schemas/job-card.schema';
import { Location, LocationDocument } from '../locations/schemas/location.schema';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    @InjectModel(JobCard.name) private jobCardModel: Model<JobCardDocument>,
    @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
  ) {}

  async getDashboard(locationId?: string): Promise<any> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const customerFilter: any = { isDeleted: false };
    if (locationId) customerFilter.preferredLocationId = locationId;

    const vehicleFilter: any = { isDeleted: false, status: 'active' };
    if (locationId) {
      const customerIds = await this.customerModel.find(customerFilter).distinct('_id');
      vehicleFilter.customerId = { $in: customerIds.length ? customerIds : [] };
    }

    const jobFilter: any = { isDeleted: false };
    const bookingFilter: any = { isDeleted: false };
    if (locationId) {
      jobFilter.locationId = locationId;
      bookingFilter.locationId = locationId;
    }

    const [
      totalCustomers,
      activeVehicles,
      openJobs,
      totalLocations,
      bookingsToday,
      pendingBookings,
      jobCardsStats,
      recentActivityData
    ] = await Promise.all([
      this.customerModel.countDocuments(customerFilter),
      this.vehicleModel.countDocuments(vehicleFilter),
      this.jobCardModel.countDocuments({ ...jobFilter, status: { $in: ['open', 'in_progress'] } }),
      this.locationModel.countDocuments({ isActive: true, ...(locationId ? { _id: locationId } : {}) }),
      this.bookingModel.countDocuments({ ...bookingFilter, scheduledAt: { $gte: today, $lt: tomorrow } }),
      this.bookingModel.countDocuments({ ...bookingFilter, status: 'pending' }),
      this.jobCardModel.aggregate([
        { $match: jobFilter },
        { 
          $group: { 
            _id: null, 
            jobsByStatus: { $push: "$status" },
            jobsByPriority: { $push: "$priority" }
          }
        }
      ]),
      this.jobCardModel.find(jobFilter)
        .sort({ updatedAt: -1 })
        .limit(10)
        .populate('customerId', 'firstName lastName')
        .select('orderNumber status updatedAt customerId')
        .exec()
    ]);

    const stats = jobCardsStats[0] || { jobsByStatus: [], jobsByPriority: [] };
    
    const jobsByStatus = { open: 0, in_progress: 0, awaiting_parts: 0, quality_check: 0, completed: 0, invoiced: 0, closed: 0 };
    stats.jobsByStatus.forEach((status: string) => { if (jobsByStatus[status] !== undefined) jobsByStatus[status]++; });

    const jobsByPriority = { low: 0, normal: 0, high: 0, urgent: 0 };
    stats.jobsByPriority.forEach((priority: string) => { if (jobsByPriority[priority] !== undefined) jobsByPriority[priority]++; });

    const recentActivity = recentActivityData.map((job: any) => ({
      orderNumber: job.orderNumber,
      status: job.status,
      customerName: job.customerId ? `\${job.customerId.firstName} \${job.customerId.lastName}` : 'Unknown',
      updatedAt: job.updatedAt
    }));

    return {
      totalCustomers,
      activeVehicles,
      openJobs,
      totalLocations,
      bookingsToday,
      pendingBookings,
      jobsByStatus,
      jobsByPriority,
      recentActivity
    };
  }
}
