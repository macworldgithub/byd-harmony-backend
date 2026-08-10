"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const customer_schema_1 = require("../customers/schemas/customer.schema");
const vehicle_schema_1 = require("../vehicles/schemas/vehicle.schema");
const booking_schema_1 = require("../bookings/schemas/booking.schema");
const job_card_schema_1 = require("../job-cards/schemas/job-card.schema");
const location_schema_1 = require("../locations/schemas/location.schema");
let AnalyticsService = class AnalyticsService {
    customerModel;
    vehicleModel;
    bookingModel;
    jobCardModel;
    locationModel;
    constructor(customerModel, vehicleModel, bookingModel, jobCardModel, locationModel) {
        this.customerModel = customerModel;
        this.vehicleModel = vehicleModel;
        this.bookingModel = bookingModel;
        this.jobCardModel = jobCardModel;
        this.locationModel = locationModel;
    }
    async getDashboard() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const [totalCustomers, activeVehicles, openJobs, totalLocations, bookingsToday, pendingBookings, jobCardsStats, recentActivityData] = await Promise.all([
            this.customerModel.countDocuments({ isDeleted: false }),
            this.vehicleModel.countDocuments({ isDeleted: false, status: 'active' }),
            this.jobCardModel.countDocuments({ isDeleted: false, status: { $in: ['open', 'in_progress'] } }),
            this.locationModel.countDocuments({ isActive: true }),
            this.bookingModel.countDocuments({ isDeleted: false, serviceDateTime: { $gte: today, $lt: tomorrow } }),
            this.bookingModel.countDocuments({ isDeleted: false, status: 'pending' }),
            this.jobCardModel.aggregate([
                { $match: { isDeleted: false } },
                {
                    $group: {
                        _id: null,
                        jobsByStatus: { $push: "$status" },
                        jobsByPriority: { $push: "$priority" }
                    }
                }
            ]),
            this.jobCardModel.find({ isDeleted: false })
                .sort({ updatedAt: -1 })
                .limit(10)
                .populate('customerId', 'firstName lastName')
                .select('orderNumber status updatedAt customerId')
                .exec()
        ]);
        const stats = jobCardsStats[0] || { jobsByStatus: [], jobsByPriority: [] };
        const jobsByStatus = { open: 0, in_progress: 0, awaiting_parts: 0, quality_check: 0, completed: 0, invoiced: 0, closed: 0 };
        stats.jobsByStatus.forEach((status) => { if (jobsByStatus[status] !== undefined)
            jobsByStatus[status]++; });
        const jobsByPriority = { low: 0, normal: 0, high: 0, urgent: 0 };
        stats.jobsByPriority.forEach((priority) => { if (jobsByPriority[priority] !== undefined)
            jobsByPriority[priority]++; });
        const recentActivity = recentActivityData.map((job) => ({
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
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(customer_schema_1.Customer.name)),
    __param(1, (0, mongoose_1.InjectModel)(vehicle_schema_1.Vehicle.name)),
    __param(2, (0, mongoose_1.InjectModel)(booking_schema_1.Booking.name)),
    __param(3, (0, mongoose_1.InjectModel)(job_card_schema_1.JobCard.name)),
    __param(4, (0, mongoose_1.InjectModel)(location_schema_1.Location.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map