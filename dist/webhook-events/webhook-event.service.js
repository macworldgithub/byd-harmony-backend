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
exports.WebhookEventService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const webhook_event_schema_1 = require("./webhook-event.schema");
let WebhookEventService = class WebhookEventService {
    webhookEventModel;
    constructor(webhookEventModel) {
        this.webhookEventModel = webhookEventModel;
    }
    async create(apiKeyId, event, payload) {
        const newEvent = new this.webhookEventModel({
            apiKeyId,
            event,
            payload,
            status: 'pending',
            nextRetryAt: new Date(),
        });
        return newEvent.save();
    }
    async markDelivered(id, responseCode) {
        return this.webhookEventModel.findByIdAndUpdate(id, {
            status: 'delivered',
            responseCode,
            lastAttemptAt: new Date(),
        }, { new: true }).exec();
    }
    async markFailed(id, error, responseCode, nextRetryAt) {
        return this.webhookEventModel.findByIdAndUpdate(id, {
            status: 'failed',
            error,
            responseCode,
            nextRetryAt,
            lastAttemptAt: new Date(),
            $inc: { attempts: 1 },
        }, { new: true }).exec();
    }
    async markSkipped(id) {
        return this.webhookEventModel.findByIdAndUpdate(id, { status: 'skipped' }, { new: true }).exec();
    }
    async getPendingDue() {
        return this.webhookEventModel.find({
            status: 'pending',
            nextRetryAt: { $lte: new Date() },
        }).exec();
    }
    async findByApiKey(apiKeyId) {
        return this.webhookEventModel.find({ apiKeyId: apiKeyId }).exec();
    }
};
exports.WebhookEventService = WebhookEventService;
exports.WebhookEventService = WebhookEventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(webhook_event_schema_1.WebhookEvent.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WebhookEventService);
//# sourceMappingURL=webhook-event.service.js.map