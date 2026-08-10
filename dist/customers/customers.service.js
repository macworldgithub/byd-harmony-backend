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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const customer_schema_1 = require("./schemas/customer.schema");
let CustomersService = class CustomersService {
    customerModel;
    constructor(customerModel) {
        this.customerModel = customerModel;
    }
    async create(createCustomerDto) {
        const createdCustomer = new this.customerModel(createCustomerDto);
        return createdCustomer.save();
    }
    async findAll(query) {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 20;
        const skip = (page - 1) * limit;
        const filter = { isDeleted: false };
        if (query.lifecycleStage) {
            filter.lifecycleStage = query.lifecycleStage;
        }
        if (query.search) {
            filter.$or = [
                { firstName: { $regex: query.search, $options: 'i' } },
                { lastName: { $regex: query.search, $options: 'i' } },
                { email: { $regex: query.search, $options: 'i' } },
                { phone: { $regex: query.search, $options: 'i' } },
            ];
        }
        const [data, total] = await Promise.all([
            this.customerModel.find(filter).skip(skip).limit(limit).exec(),
            this.customerModel.countDocuments(filter).exec(),
        ]);
        return { data, meta: { total, page, limit } };
    }
    async search(q) {
        if (!q || q.length < 2)
            return [];
        const filter = {
            isDeleted: false,
            $or: [
                { firstName: { $regex: q, $options: 'i' } },
                { lastName: { $regex: q, $options: 'i' } },
                { email: { $regex: q, $options: 'i' } },
                { phone: { $regex: q, $options: 'i' } },
            ],
        };
        return this.customerModel.find(filter, '_id firstName lastName email phone').limit(10).exec();
    }
    async findOne(id) {
        const customer = await this.customerModel.findById(id).populate('preferredLocationId', 'name').exec();
        if (!customer) {
            throw new common_1.NotFoundException(`Customer #${id} not found`);
        }
        return customer;
    }
    async update(id, updateCustomerDto) {
        const existingCustomer = await this.customerModel.findByIdAndUpdate(id, updateCustomerDto, { new: true }).exec();
        if (!existingCustomer) {
            throw new common_1.NotFoundException(`Customer #${id} not found`);
        }
        return existingCustomer;
    }
    async remove(id) {
        const customer = await this.customerModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).exec();
        if (!customer) {
            throw new common_1.NotFoundException(`Customer #${id} not found`);
        }
        return customer;
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(customer_schema_1.Customer.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CustomersService);
//# sourceMappingURL=customers.service.js.map