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
exports.JobCardItemDto = exports.UpdateJobCardDto = exports.CreateJobCardDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateJobCardDto {
    customerId;
    vehicleId;
    locationId;
    bookingId;
    technicianId;
    priority;
    serviceType;
    workRequired;
    odometerIn;
    estimatedCost;
}
exports.CreateJobCardDto = CreateJobCardDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateJobCardDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateJobCardDto.prototype, "vehicleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateJobCardDto.prototype, "locationId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateJobCardDto.prototype, "bookingId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateJobCardDto.prototype, "technicianId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['low', 'normal', 'high', 'urgent'], default: 'normal' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['low', 'normal', 'high', 'urgent']),
    __metadata("design:type", String)
], CreateJobCardDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['routine_service', 'repair', 'warranty', 'recall', 'inspection', 'delivery'] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(['routine_service', 'repair', 'warranty', 'recall', 'inspection', 'delivery']),
    __metadata("design:type", String)
], CreateJobCardDto.prototype, "serviceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateJobCardDto.prototype, "workRequired", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateJobCardDto.prototype, "odometerIn", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateJobCardDto.prototype, "estimatedCost", void 0);
class UpdateJobCardDto {
    technicianId;
    diagnosis;
    odometerOut;
    actualCost;
    status;
    priority;
}
exports.UpdateJobCardDto = UpdateJobCardDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], UpdateJobCardDto.prototype, "technicianId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateJobCardDto.prototype, "diagnosis", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateJobCardDto.prototype, "odometerOut", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateJobCardDto.prototype, "actualCost", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['open', 'in_progress', 'awaiting_parts', 'quality_check', 'completed', 'invoiced', 'closed'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['open', 'in_progress', 'awaiting_parts', 'quality_check', 'completed', 'invoiced', 'closed']),
    __metadata("design:type", String)
], UpdateJobCardDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['low', 'normal', 'high', 'urgent'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['low', 'normal', 'high', 'urgent']),
    __metadata("design:type", String)
], UpdateJobCardDto.prototype, "priority", void 0);
class JobCardItemDto {
    type;
    description;
    quantity;
    unitCost;
    partNumber;
    technicianId;
}
exports.JobCardItemDto = JobCardItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['labour', 'parts', 'sublet', 'sundry'] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(['labour', 'parts', 'sublet', 'sundry']),
    __metadata("design:type", String)
], JobCardItemDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], JobCardItemDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], JobCardItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], JobCardItemDto.prototype, "unitCost", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], JobCardItemDto.prototype, "partNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], JobCardItemDto.prototype, "technicianId", void 0);
//# sourceMappingURL=job-card.dto.js.map