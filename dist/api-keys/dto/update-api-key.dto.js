"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateApiKeyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_api_key_dto_1 = require("./create-api-key.dto");
class UpdateApiKeyDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(create_api_key_dto_1.CreateApiKeyDto, [
    'name',
    'role',
    'locationId',
    'department',
    'isActive',
    'scopes',
    'webhookUrl',
    'webhookSecret',
    'retryStrategy',
    'maxRetries',
])) {
}
exports.UpdateApiKeyDto = UpdateApiKeyDto;
//# sourceMappingURL=update-api-key.dto.js.map