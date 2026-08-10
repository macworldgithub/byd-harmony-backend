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
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const booking_schema_1 = require("./schemas/booking.schema");
let BookingsService = class BookingsService {
    bookingModel;
    constructor(bookingModel) {
        this.bookingModel = bookingModel;
    }
    async create(createBookingDto) {
        const createdBooking = new this.bookingModel(createBookingDto);
        return createdBooking.save();
    }
    async findAll(query) {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 20;
        const skip = (page - 1) * limit;
        const filter = { isDeleted: false };
        if (query.locationId)
            filter.locationId = query.locationId;
        if (query.status)
            filter.status = query.status;
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
    async findOne(id) {
        const booking = await this.bookingModel.findById(id)
            .populate('customerId')
            .populate('vehicleId')
            .populate('locationId')
            .exec();
        if (!booking) {
            throw new common_1.NotFoundException(`Booking #${id} not found`);
        }
        return booking;
    }
    async update(id, updateBookingDto) {
        const existingBooking = await this.bookingModel.findByIdAndUpdate(id, updateBookingDto, { new: true }).exec();
        if (!existingBooking) {
            throw new common_1.NotFoundException(`Booking #${id} not found`);
        }
        return existingBooking;
    }
    async remove(id) {
        const booking = await this.bookingModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).exec();
        if (!booking) {
            throw new common_1.NotFoundException(`Booking #${id} not found`);
        }
        return booking;
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(booking_schema_1.Booking.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map