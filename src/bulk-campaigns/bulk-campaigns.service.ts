import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BulkCampaign, BulkCampaignDocument } from './schemas/bulk-campaign.schema';
import { BulkRecipient, BulkRecipientDocument } from './schemas/bulk-recipient.schema';
import { Customer, CustomerDocument } from '../customers/schemas/customer.schema';
import { CreateBulkCampaignDto } from './dto/create-bulk-campaign.dto';

@Injectable()
export class BulkCampaignsService {
  private readonly logger = new Logger(BulkCampaignsService.name);

  constructor(
    @InjectModel(BulkCampaign.name) private bulkCampaignModel: Model<BulkCampaignDocument>,
    @InjectModel(BulkRecipient.name) private bulkRecipientModel: Model<BulkRecipientDocument>,
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}

  async create(createBulkCampaignDto: CreateBulkCampaignDto): Promise<BulkCampaignDocument> {
    const createdCampaign = new this.bulkCampaignModel({
      ...createBulkCampaignDto,
      status: 'draft',
      totalRecipients: 0,
      sentCount: 0,
      failedCount: 0,
    });
    return createdCampaign.save();
  }

  async findAll(): Promise<BulkCampaignDocument[]> {
    return this.bulkCampaignModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<BulkCampaignDocument> {
    const campaign = await this.bulkCampaignModel.findById(id).exec();
    if (!campaign) {
      throw new NotFoundException(`BulkCampaign with ID ${id} not found`);
    }
    return campaign;
  }

  async sendCampaign(id: string): Promise<any> {
    const campaign = await this.findOne(id);

    if (campaign.status !== 'draft') {
      throw new BadRequestException(`Campaign status is ${campaign.status}, only draft campaigns can be sent.`);
    }

    // Determine query based on segment
    let customerQuery: any = { consentSms: true, isDeleted: false };
    
    switch (campaign.segment) {
      case 'all_live_clients':
        customerQuery.lifecycleStage = 'active'; // Adjust as per your exact logic
        break;
      case 'buying_journey':
        customerQuery.lifecycleStage = 'prospect'; // Adjust as per your exact logic
        break;
      case 'trading_upgrading':
        customerQuery.lifecycleStage = 'active'; // Replace with appropriate filter
        break;
      case 'service_maintenance':
        customerQuery.lifecycleStage = 'service';
        break;
      default:
        throw new BadRequestException(`Unknown segment: ${campaign.segment}`);
    }

    // Fetch matching customers
    const recipients = await this.customerModel.find(customerQuery).exec();

    if (!recipients || recipients.length === 0) {
      throw new BadRequestException('No matching customers found for this segment.');
    }

    // Prepare recipients for bulk insert
    const bulkRecipients = recipients.map((customer) => {
      let renderedBody = campaign.body;
      // Use customer.firstName or whatever name field is appropriate
      renderedBody = renderedBody.replace(/\{\{first_name\}\}/g, customer.firstName || '');

      return {
        campaignId: campaign._id,
        customerId: customer._id,
        name: customer.firstName + (customer.lastName ? ' ' + customer.lastName : ''),
        phone: customer.phone,
        renderedBody,
        status: 'pending',
      };
    });

    // Bulk insert into BulkRecipient
    await this.bulkRecipientModel.insertMany(bulkRecipients);

    // Update campaign status
    campaign.totalRecipients = recipients.length;
    campaign.status = 'sending';
    await campaign.save();

    // Start background process
    this.processCampaignSending(campaign._id.toString(), recipients.length);

    return { message: 'Campaign sending initiated successfully.' };
  }

  private async processCampaignSending(campaignId: string, totalRecipients: number) {
    this.logger.log(`Starting background sending for campaign ${campaignId}`);
    
    // Fetch all pending recipients for this campaign
    const recipients = await this.bulkRecipientModel.find({ campaignId, status: 'pending' }).exec();

    let sentCount = 0;
    let failedCount = 0;

    for (const recipient of recipients) {
      try {
        // Mocking SMS sending for now
        this.logger.log(`[SMS MOCK] Sending SMS to ${recipient.phone}: ${recipient.renderedBody}`);
        
        // Simulate a slight delay or async operation
        await new Promise((resolve) => setTimeout(resolve, 50));

        // If we had a real SMS service:
        // await this.smsService.send({ to: recipient.phone, body: recipient.renderedBody });

        recipient.status = 'sent';
        await recipient.save();
        sentCount++;
      } catch (error) {
        this.logger.error(`Failed to send SMS to ${recipient.phone}`, error);
        recipient.status = 'failed';
        recipient.error = error.message || 'Unknown error';
        await recipient.save();
        failedCount++;
      }
    }

    // Update campaign once all is done
    await this.bulkCampaignModel.findByIdAndUpdate(campaignId, {
      status: 'complete',
      $inc: { sentCount, failedCount }
    });

    this.logger.log(`Campaign ${campaignId} completed. Sent: ${sentCount}, Failed: ${failedCount}`);
  }
}
