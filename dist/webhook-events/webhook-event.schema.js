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
exports.WebhookEventSchema = exports.WebhookEvent = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let WebhookEvent = class WebhookEvent {
    apiKeyId;
    event;
    payload;
    status;
    attempts;
    lastAttemptAt;
    nextRetryAt;
    responseCode;
    error;
};
exports.WebhookEvent = WebhookEvent;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'ApiKey', index: true }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], WebhookEvent.prototype, "apiKeyId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], WebhookEvent.prototype, "event", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.Mixed, required: true }),
    __metadata("design:type", Object)
], WebhookEvent.prototype, "payload", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['pending', 'delivered', 'failed', 'skipped'],
        default: 'pending',
    }),
    __metadata("design:type", String)
], WebhookEvent.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], WebhookEvent.prototype, "attempts", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], WebhookEvent.prototype, "lastAttemptAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], WebhookEvent.prototype, "nextRetryAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], WebhookEvent.prototype, "responseCode", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], WebhookEvent.prototype, "error", void 0);
exports.WebhookEvent = WebhookEvent = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], WebhookEvent);
exports.WebhookEventSchema = mongoose_1.SchemaFactory.createForClass(WebhookEvent);
exports.WebhookEventSchema.index({ status: 1, nextRetryAt: 1 });
//# sourceMappingURL=webhook-event.schema.js.map