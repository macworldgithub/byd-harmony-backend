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
exports.JobCardsController = void 0;
const common_1 = require("@nestjs/common");
const job_cards_service_1 = require("./job-cards.service");
const job_card_dto_1 = require("./dto/job-card.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let JobCardsController = class JobCardsController {
    jobCardsService;
    constructor(jobCardsService) {
        this.jobCardsService = jobCardsService;
    }
    create(createJobCardDto) {
        return this.jobCardsService.create(createJobCardDto);
    }
    findAll(query) {
        return this.jobCardsService.findAll(query);
    }
    findOne(id) {
        return this.jobCardsService.findOne(id);
    }
    update(id, updateJobCardDto) {
        return this.jobCardsService.update(id, updateJobCardDto);
    }
    remove(id) {
        return this.jobCardsService.remove(id);
    }
    addItem(id, itemDto) {
        return this.jobCardsService.addItem(id, itemDto);
    }
    updateItem(id, itemId, itemDto) {
        return this.jobCardsService.updateItem(id, itemId, itemDto);
    }
    removeItem(id, itemId) {
        return this.jobCardsService.removeItem(id, itemId);
    }
};
exports.JobCardsController = JobCardsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new job card' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [job_card_dto_1.CreateJobCardDto]),
    __metadata("design:returntype", void 0)
], JobCardsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all job cards paginated' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], JobCardsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a job card by id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JobCardsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a job card' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, job_card_dto_1.UpdateJobCardDto]),
    __metadata("design:returntype", void 0)
], JobCardsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a job card' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JobCardsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/items'),
    (0, swagger_1.ApiOperation)({ summary: 'Add item to job card' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, job_card_dto_1.JobCardItemDto]),
    __metadata("design:returntype", void 0)
], JobCardsController.prototype, "addItem", null);
__decorate([
    (0, common_1.Put)(':id/items/:itemId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update item in job card' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('itemId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], JobCardsController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Delete)(':id/items/:itemId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove item from job card' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('itemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], JobCardsController.prototype, "removeItem", null);
exports.JobCardsController = JobCardsController = __decorate([
    (0, swagger_1.ApiTags)('job-cards'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('job-cards'),
    __metadata("design:paramtypes", [job_cards_service_1.JobCardsService])
], JobCardsController);
//# sourceMappingURL=job-cards.controller.js.map