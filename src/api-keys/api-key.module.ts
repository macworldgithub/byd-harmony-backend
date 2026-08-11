import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiKey, ApiKeySchema } from './api-key.schema';
import { ApiKeysController } from './api-key.controller';
import { ApiKeysService } from './api-key.service';
import { WebhookEventModule } from '../webhook-events/webhook-event.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ApiKey.name, schema: ApiKeySchema }]),
    WebhookEventModule,
  ],
  controllers: [ApiKeysController],
  providers: [ApiKeysService],
  exports: [ApiKeysService],
})
export class ApiKeysModule {}
