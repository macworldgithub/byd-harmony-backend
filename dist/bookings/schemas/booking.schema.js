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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingSchema = exports.Booking = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const customer_schema_1 = require("../../customers/schemas/customer.schema");
const vehicle_schema_1 = require("../../vehicles/schemas/vehicle.schema");
const location_schema_1 = require("../../locations/schemas/location.schema");
let Booking = class Booking {
    customerId;
    vehicleId;
    locationId;
    scheduledAt;
    estimatedDuration;
    serviceType;
    description;
    status;
    assignedTechnicianId;
    customerNotes;
    internalNotes;
    completedAt;
    isDeleted;
};
exports.Booking = Booking;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Customer', required: true }),
    __metadata("design:type", customer_schema_1.Customer)
], Booking.prototype, "customerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Vehicle', required: true }),
    __metadata("design:type", vehicle_schema_1.Vehicle)
], Booking.prototype, "vehicleId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Location', required: true }),
    __metadata("design:type", location_schema_1.Location)
], Booking.prototype, "locationId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Booking.prototype, "scheduledAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 60 }),
    __metadata("design:type", Number)
], Booking.prototype, "estimatedDuration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['routine', 'repair', 'warranty', 'recall', 'inspection', 'pre_delivery'], default: 'routine' }),
    __metadata("design:type", String)
], Booking.prototype, "serviceType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Booking.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'], default: 'scheduled' }),
    __metadata("design:type", String)
], Booking.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Booking.prototype, "assignedTechnicianId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Booking.prototype, "customerNotes", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Booking.prototype, "internalNotes", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Booking.prototype, "completedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Booking.prototype, "isDeleted", void 0);
exports.Booking = Booking = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Booking);
exports.BookingSchema = mongoose_1.SchemaFactory.createForClass(Booking);
//# sourceMappingURL=booking.schema.js.map