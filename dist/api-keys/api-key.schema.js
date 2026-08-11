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
exports.ApiKeySchema = exports.ApiKey = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let ApiKey = class ApiKey {
    name;
    keyHash;
    keyPrefix;
    role;
    locationId;
    department;
    isActive;
    scopes;
    webhookUrl;
    webhookSecret;
    retryStrategy;
    maxRetries;
    lastUsedAt;
    createdById;
};
exports.ApiKey = ApiKey;
__decorate([
    (0, mongoose_1.Prop)({ required: true, maxlength: 200 }),
    __metadata("design:type", String)
], ApiKey.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, maxlength: 64 }),
    __metadata("design:type", String)
], ApiKey.prototype, "keyHash", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, maxlength: 16 }),
    __metadata("design:type", String)
], ApiKey.prototype, "keyPrefix", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['sales', 'service', 'delivery', 'admin', 'executive', 'readonly'],
        default: 'readonly',
    }),
    __metadata("design:type", String)
], ApiKey.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ApiKey.prototype, "locationId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['sales', 'service', 'delivery', 'finance', 'executive'],
    }),
    __metadata("design:type", String)
], ApiKey.prototype, "department", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], ApiKey.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [String],
        default: [
            'customers',
            'vehicles',
            'bookings',
            'jobs',
            'documents',
            'locations',
            'activity',
            'stats',
        ],
    }),
    __metadata("design:type", Array)
], ApiKey.prototype, "scopes", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ApiKey.prototype, "webhookUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ApiKey.prototype, "webhookSecret", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['immediate', 'linear', 'exponential'],
        default: 'exponential',
    }),
    __metadata("design:type", String)
], ApiKey.prototype, "retryStrategy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 3 }),
    __metadata("design:type", Number)
], ApiKey.prototype, "maxRetries", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], ApiKey.prototype, "lastUsedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ApiKey.prototype, "createdById", void 0);
exports.ApiKey = ApiKey = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ApiKey);
exports.ApiKeySchema = mongoose_1.SchemaFactory.createForClass(ApiKey);
//# sourceMappingURL=api-key.schema.js.map