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
exports.ApiKeysService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const crypto_1 = require("crypto");
const api_key_schema_1 = require("./api-key.schema");
const webhook_event_service_1 = require("../webhook-events/webhook-event.service");
let ApiKeysService = class ApiKeysService {
    apiKeyModel;
    webhookEventService;
    constructor(apiKeyModel, webhookEventService) {
        this.apiKeyModel = apiKeyModel;
        this.webhookEventService = webhookEventService;
    }
    generateKey() {
        const rawKey = (0, crypto_1.randomBytes)(32).toString('hex');
        const plaintextKey = `gs_live_${rawKey}`;
        const keyHash = (0, crypto_1.createHash)('sha256').update(plaintextKey).digest('hex');
        const keyPrefix = plaintextKey.substring(0, 16);
        return { plaintextKey, keyHash, keyPrefix };
    }
    async create(dto) {
        const { plaintextKey, keyHash, keyPrefix } = this.generateKey();
        const newApiKey = new this.apiKeyModel({
            ...dto,
            keyHash,
            keyPrefix,
        });
        const saved = await newApiKey.save();
        if (saved.webhookUrl) {
            await this.webhookEventService.create(String(saved._id), 'apikey.created', { id: saved._id, name: saved.name });
        }
        return { apiKey: saved, plaintextKey };
    }
    async findAll() {
        return this.apiKeyModel.find().select('-keyHash').exec();
    }
    async findById(id) {
        const key = await this.apiKeyModel.findById(id).select('-keyHash').exec();
        if (!key) {
            throw new common_1.NotFoundException(`ApiKey with ID ${id} not found`);
        }
        return key;
    }
    async findByHash(keyHash) {
        const key = await this.apiKeyModel.findOne({ keyHash }).exec();
        if (!key) {
            throw new common_1.NotFoundException('ApiKey not found');
        }
        return key;
    }
    async rotate(id) {
        const { plaintextKey, keyHash, keyPrefix } = this.generateKey();
        const updated = await this.apiKeyModel
            .findByIdAndUpdate(id, { keyHash, keyPrefix }, { new: true })
            .exec();
        if (!updated) {
            throw new common_1.NotFoundException(`ApiKey with ID ${id} not found`);
        }
        if (updated.webhookUrl) {
            await this.webhookEventService.create(String(updated._id), 'apikey.rotated', { id: updated._id, name: updated.name });
        }
        return { apiKey: updated, plaintextKey };
    }
    async update(id, dto) {
        const updated = await this.apiKeyModel
            .findByIdAndUpdate(id, dto, { new: true })
            .select('-keyHash')
            .exec();
        if (!updated) {
            throw new common_1.NotFoundException(`ApiKey with ID ${id} not found`);
        }
        return updated;
    }
    async revoke(id) {
        const updated = await this.apiKeyModel
            .findByIdAndUpdate(id, { isActive: false }, { new: true })
            .select('-keyHash')
            .exec();
        if (!updated) {
            throw new common_1.NotFoundException(`ApiKey with ID ${id} not found`);
        }
        if (updated.webhookUrl) {
            await this.webhookEventService.create(String(updated._id), 'apikey.revoked', { id: updated._id, name: updated.name });
        }
        return updated;
    }
    async updateLastUsed(id) {
        await this.apiKeyModel
            .findByIdAndUpdate(id, { lastUsedAt: new Date() })
            .exec();
    }
};
exports.ApiKeysService = ApiKeysService;
exports.ApiKeysService = ApiKeysService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(api_key_schema_1.ApiKey.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        webhook_event_service_1.WebhookEventService])
], ApiKeysService);
//# sourceMappingURL=api-key.service.js.map