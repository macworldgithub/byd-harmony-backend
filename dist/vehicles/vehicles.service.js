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
exports.VehiclesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const vehicle_schema_1 = require("./schemas/vehicle.schema");
let VehiclesService = class VehiclesService {
    vehicleModel;
    constructor(vehicleModel) {
        this.vehicleModel = vehicleModel;
    }
    async create(createVehicleDto) {
        const createdVehicle = new this.vehicleModel(createVehicleDto);
        return createdVehicle.save();
    }
    async findAll(query) {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 20;
        const skip = (page - 1) * limit;
        const filter = { isDeleted: false };
        if (query.customerId)
            filter.customerId = query.customerId;
        if (query.status)
            filter.status = query.status;
        const [data, total] = await Promise.all([
            this.vehicleModel.find(filter).populate('customerId', 'firstName lastName phone').skip(skip).limit(limit).exec(),
            this.vehicleModel.countDocuments(filter).exec(),
        ]);
        return { data, meta: { total, page, limit } };
    }
    async search(query) {
        const q = query.q;
        const filter = { isDeleted: false };
        if (query.customerId)
            filter.customerId = query.customerId;
        if (q) {
            filter.$or = [
                { rego: { $regex: q, $options: 'i' } },
                { make: { $regex: q, $options: 'i' } },
                { model: { $regex: q, $options: 'i' } },
                { vin: { $regex: q, $options: 'i' } },
            ];
        }
        return this.vehicleModel.find(filter, '_id make model year rego vin customerId').limit(10).exec();
    }
    async findOne(id) {
        const vehicle = await this.vehicleModel.findById(id).populate('customerId', 'firstName lastName phone').exec();
        if (!vehicle) {
            throw new common_1.NotFoundException(`Vehicle #${id} not found`);
        }
        return vehicle;
    }
    async update(id, updateVehicleDto) {
        const current = await this.vehicleModel.findById(id).exec();
        if (!current)
            throw new common_1.NotFoundException(`Vehicle #${id} not found`);
        const updateData = { ...updateVehicleDto };
        if (updateVehicleDto.odometer !== undefined && updateVehicleDto.odometer !== current.odometer) {
            updateData.odometerUpdatedAt = new Date();
        }
        const existingVehicle = await this.vehicleModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
        return existingVehicle;
    }
    async remove(id) {
        const vehicle = await this.vehicleModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).exec();
        if (!vehicle) {
            throw new common_1.NotFoundException(`Vehicle #${id} not found`);
        }
        return vehicle;
    }
};
exports.VehiclesService = VehiclesService;
exports.VehiclesService = VehiclesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(vehicle_schema_1.Vehicle.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], VehiclesService);
//# sourceMappingURL=vehicles.service.js.map