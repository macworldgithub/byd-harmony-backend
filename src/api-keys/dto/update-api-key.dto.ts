import { PartialType, PickType } from '@nestjs/swagger';
import { CreateApiKeyDto } from './create-api-key.dto';

export class UpdateApiKeyDto extends PartialType(
  PickType(CreateApiKeyDto, [
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
  ] as const),
) {}
