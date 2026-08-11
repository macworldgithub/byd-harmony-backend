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
exports.ApiKeysController = void 0;
const common_1 = require("@nestjs/common");
const api_key_service_1 = require("./api-key.service");
const create_api_key_dto_1 = require("./dto/create-api-key.dto");
const update_api_key_dto_1 = require("./dto/update-api-key.dto");
let ApiKeysController = class ApiKeysController {
    apiKeysService;
    constructor(apiKeysService) {
        this.apiKeysService = apiKeysService;
    }
    async create(createApiKeyDto) {
        return this.apiKeysService.create(createApiKeyDto);
    }
    async findAll() {
        return this.apiKeysService.findAll();
    }
    async findById(id) {
        return this.apiKeysService.findById(id);
    }
    async update(id, updateApiKeyDto) {
        return this.apiKeysService.update(id, updateApiKeyDto);
    }
    async rotate(id) {
        return this.apiKeysService.rotate(id);
    }
    async revoke(id) {
        return this.apiKeysService.revoke(id);
    }
};
exports.ApiKeysController = ApiKeysController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_api_key_dto_1.CreateApiKeyDto]),
    __metadata("design:returntype", Promise)
], ApiKeysController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiKeysController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApiKeysController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_api_key_dto_1.UpdateApiKeyDto]),
    __metadata("design:returntype", Promise)
], ApiKeysController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/rotate'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApiKeysController.prototype, "rotate", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApiKeysController.prototype, "revoke", null);
exports.ApiKeysController = ApiKeysController = __decorate([
    (0, common_1.Controller)('api-keys'),
    __metadata("design:paramtypes", [api_key_service_1.ApiKeysService])
], ApiKeysController);
//# sourceMappingURL=api-key.controller.js.map