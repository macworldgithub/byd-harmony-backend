"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookEventModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const webhook_event_schema_1 = require("./webhook-event.schema");
const webhook_event_service_1 = require("./webhook-event.service");
let WebhookEventModule = class WebhookEventModule {
};
exports.WebhookEventModule = WebhookEventModule;
exports.WebhookEventModule = WebhookEventModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: webhook_event_schema_1.WebhookEvent.name, schema: webhook_event_schema_1.WebhookEventSchema },
            ]),
        ],
        providers: [webhook_event_service_1.WebhookEventService],
        exports: [webhook_event_service_1.WebhookEventService],
    })
], WebhookEventModule);
//# sourceMappingURL=webhook-event.module.js.map