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
exports.JobCardSchema = exports.JobCard = exports.JobCardItemSchema = exports.JobCardItem = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const customer_schema_1 = require("../../customers/schemas/customer.schema");
const vehicle_schema_1 = require("../../vehicles/schemas/vehicle.schema");
const location_schema_1 = require("../../locations/schemas/location.schema");
const booking_schema_1 = require("../../bookings/schemas/booking.schema");
const user_schema_1 = require("../../users/schemas/user.schema");
let JobCardItem = class JobCardItem {
    _id;
    type;
    description;
    quantity;
    unitCost;
    totalCost;
    partNumber;
    technicianId;
    createdAt;
};
exports.JobCardItem = JobCardItem;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, default: () => new mongoose_2.Types.ObjectId() }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], JobCardItem.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['labour', 'parts', 'sublet', 'sundry'] }),
    __metadata("design:type", String)
], JobCardItem.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], JobCardItem.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 1 }),
    __metadata("design:type", Number)
], JobCardItem.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], JobCardItem.prototype, "unitCost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], JobCardItem.prototype, "totalCost", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], JobCardItem.prototype, "partNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], JobCardItem.prototype, "technicianId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], JobCardItem.prototype, "createdAt", void 0);
exports.JobCardItem = JobCardItem = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], JobCardItem);
exports.JobCardItemSchema = mongoose_1.SchemaFactory.createForClass(JobCardItem);
let JobCard = class JobCard {
    orderNumber;
    bookingId;
    customerId;
    vehicleId;
    locationId;
    technicianId;
    status;
    priority;
    serviceType;
    workRequired;
    diagnosis;
    odometerIn;
    odometerOut;
    estimatedCost;
    actualCost;
    labourTotal;
    partsTotal;
    startedAt;
    completedAt;
    items;
    isDeleted;
};
exports.JobCard = JobCard;
__decorate([
    (0, mongoose_1.Prop)({ unique: true }),
    __metadata("design:type", String)
], JobCard.prototype, "orderNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Booking' }),
    __metadata("design:type", booking_schema_1.Booking)
], JobCard.prototype, "bookingId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Customer', required: true }),
    __metadata("design:type", customer_schema_1.Customer)
], JobCard.prototype, "customerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Vehicle', required: true }),
    __metadata("design:type", vehicle_schema_1.Vehicle)
], JobCard.prototype, "vehicleId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Location', required: true }),
    __metadata("design:type", location_schema_1.Location)
], JobCard.prototype, "locationId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], JobCard.prototype, "technicianId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['open', 'in_progress', 'awaiting_parts', 'quality_check', 'completed', 'invoiced', 'closed'], default: 'open' }),
    __metadata("design:type", String)
], JobCard.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['low', 'normal', 'high', 'urgent'], default: 'normal' }),
    __metadata("design:type", String)
], JobCard.prototype, "priority", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['routine_service', 'repair', 'warranty', 'recall', 'inspection', 'delivery'] }),
    __metadata("design:type", String)
], JobCard.prototype, "serviceType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], JobCard.prototype, "workRequired", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], JobCard.prototype, "diagnosis", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], JobCard.prototype, "odometerIn", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], JobCard.prototype, "odometerOut", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], JobCard.prototype, "estimatedCost", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], JobCard.prototype, "actualCost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], JobCard.prototype, "labourTotal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], JobCard.prototype, "partsTotal", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], JobCard.prototype, "startedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], JobCard.prototype, "completedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.JobCardItemSchema], default: [] }),
    __metadata("design:type", Array)
], JobCard.prototype, "items", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], JobCard.prototype, "isDeleted", void 0);
exports.JobCard = JobCard = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], JobCard);
exports.JobCardSchema = mongoose_1.SchemaFactory.createForClass(JobCard);
//# sourceMappingURL=job-card.schema.js.map