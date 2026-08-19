import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BulkCampaignsService } from './bulk-campaigns.service';
import { BulkCampaignsController } from './bulk-campaigns.controller';
import { BulkCampaign, BulkCampaignSchema } from './schemas/bulk-campaign.schema';
import { BulkRecipient, BulkRecipientSchema } from './schemas/bulk-recipient.schema';
import { Customer, CustomerSchema } from '../customers/schemas/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BulkCampaign.name, schema: BulkCampaignSchema },
      { name: BulkRecipient.name, schema: BulkRecipientSchema },
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [BulkCampaignsController],
  providers: [BulkCampaignsService],
})
export class BulkCampaignsModule {}
