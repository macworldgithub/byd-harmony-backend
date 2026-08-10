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
exports.LocationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const location_schema_1 = require("./schemas/location.schema");
let LocationsService = class LocationsService {
    locationModel;
    constructor(locationModel) {
        this.locationModel = locationModel;
    }
    async create(createLocationDto) {
        const createdLocation = new this.locationModel(createLocationDto);
        return createdLocation.save();
    }
    async findAll(query) {
        const filter = { isActive: { $ne: false } };
        if (query.isActive !== undefined)
            filter.isActive = query.isActive === 'true';
        if (query.type)
            filter.type = query.type;
        return this.locationModel.find(filter).exec();
    }
    async getDropdown() {
        return this.locationModel.find({ isActive: true }, '_id name type').exec();
    }
    async findOne(id) {
        const location = await this.locationModel.findById(id).exec();
        if (!location) {
            throw new common_1.NotFoundException(`Location #${id} not found`);
        }
        return location;
    }
    async update(id, updateLocationDto) {
        const existingLocation = await this.locationModel.findByIdAndUpdate(id, updateLocationDto, { new: true }).exec();
        if (!existingLocation) {
            throw new common_1.NotFoundException(`Location #${id} not found`);
        }
        return existingLocation;
    }
    async remove(id) {
        const location = await this.locationModel.findByIdAndUpdate(id, { isActive: false }, { new: true }).exec();
        if (!location) {
            throw new common_1.NotFoundException(`Location #${id} not found`);
        }
        return location;
    }
};
exports.LocationsService = LocationsService;
exports.LocationsService = LocationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(location_schema_1.Location.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LocationsService);
//# sourceMappingURL=locations.service.js.map