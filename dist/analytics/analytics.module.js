"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsModule = void 0;
const common_1 = require("@nestjs/common");
const analytics_controller_1 = require("./analytics.controller");
const analytics_service_1 = require("./analytics.service");
const mongoose_1 = require("@nestjs/mongoose");
const customer_schema_1 = require("../customers/schemas/customer.schema");
const vehicle_schema_1 = require("../vehicles/schemas/vehicle.schema");
const booking_schema_1 = require("../bookings/schemas/booking.schema");
const job_card_schema_1 = require("../job-cards/schemas/job-card.schema");
const location_schema_1 = require("../locations/schemas/location.schema");
let AnalyticsModule = class AnalyticsModule {
};
exports.AnalyticsModule = AnalyticsModule;
exports.AnalyticsModule = AnalyticsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: customer_schema_1.Customer.name, schema: customer_schema_1.CustomerSchema },
                { name: vehicle_schema_1.Vehicle.name, schema: vehicle_schema_1.VehicleSchema },
                { name: booking_schema_1.Booking.name, schema: booking_schema_1.BookingSchema },
                { name: job_card_schema_1.JobCard.name, schema: job_card_schema_1.JobCardSchema },
                { name: location_schema_1.Location.name, schema: location_schema_1.LocationSchema },
            ]),
        ],
        controllers: [analytics_controller_1.AnalyticsController],
        providers: [analytics_service_1.AnalyticsService],
    })
], AnalyticsModule);
//# sourceMappingURL=analytics.module.js.map