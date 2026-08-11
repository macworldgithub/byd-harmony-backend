import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhookEvent, WebhookEventSchema } from './webhook-event.schema';
import { WebhookEventService } from './webhook-event.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WebhookEvent.name, schema: WebhookEventSchema },
    ]),
  ],
  providers: [WebhookEventService],
  exports: [WebhookEventService],
})
export class WebhookEventModule {}
