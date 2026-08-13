import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomBytes, createHash } from 'crypto';
import { ApiKey, ApiKeyDocument } from './api-key.schema';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';
import { WebhookEventService } from '../webhook-events/webhook-event.service';

@Injectable()
export class ApiKeysService {
  constructor(
    @InjectModel(ApiKey.name) private apiKeyModel: Model<ApiKeyDocument>,
    private readonly webhookEventService: WebhookEventService,
  ) {}

  private generateKey() {
    const rawKey = randomBytes(32).toString('hex');
    const plaintextKey = `gs_live_${rawKey}`;
    const keyHash = createHash('sha256').update(plaintextKey).digest('hex');
    const keyPrefix = plaintextKey.substring(0, 16); // gs_live_ + 8 chars
    return { plaintextKey, keyHash, keyPrefix };
  }

  /**
   * Creates a new API key.
   * @param dto Data for the new API key
   * @returns The newly created key document and the plaintext key (returned only once).
   */
  async create(dto: CreateApiKeyDto) {
    const { plaintextKey, keyHash, keyPrefix } = this.generateKey();
    const newApiKey = new this.apiKeyModel({
      ...dto,
      keyHash,
      keyPrefix,
    });
    const saved = await newApiKey.save();
    
    // Fire webhook event if webhookUrl is present
    if (saved.webhookUrl) {
      await this.webhookEventService.create(
        String(saved._id),
        'apikey.created',
        { id: saved._id, name: saved.name },
      );
    }

    // plaintext returned here only — not stored
    return { apiKey: saved, plaintextKey };
  }

  /**
   * Retrieves all API keys (omits keyHash).
   */
  async findAll(locationId?: string): Promise<ApiKeyDocument[]> {
    const filter = locationId ? { locationId } : {};
    return this.apiKeyModel.find(filter).select('-keyHash').exec();
  }

  /**
   * Finds an API key by its ID.
   */
  async findById(id: string): Promise<ApiKeyDocument> {
    const key = await this.apiKeyModel.findById(id).select('-keyHash').exec();
    if (!key) {
      throw new NotFoundException(`ApiKey with ID ${id} not found`);
    }
    return key;
  }

  /**
   * Finds an API key by its hash (used for auth middleware).
   */
  async findByHash(keyHash: string): Promise<ApiKeyDocument> {
    const key = await this.apiKeyModel.findOne({ keyHash }).exec();
    if (!key) {
      throw new NotFoundException('ApiKey not found');
    }
    return key;
  }

  /**
   * Rotates an API key.
   * @param id ID of the API key
   * @returns The updated key document and the new plaintext key (returned only once).
   */
  async rotate(id: string) {
    const { plaintextKey, keyHash, keyPrefix } = this.generateKey();
    const updated = await this.apiKeyModel
      .findByIdAndUpdate(
        id,
        { keyHash, keyPrefix },
        { new: true },
      )
      .exec();

    if (!updated) {
      throw new NotFoundException(`ApiKey with ID ${id} not found`);
    }

    if (updated.webhookUrl) {
      await this.webhookEventService.create(
        String(updated._id),
        'apikey.rotated',
        { id: updated._id, name: updated.name },
      );
    }

    // plaintext returned here only — not stored
    return { apiKey: updated, plaintextKey };
  }

  /**
   * Updates an API key's settings.
   */
  async update(id: string, dto: UpdateApiKeyDto): Promise<ApiKeyDocument> {
    const updated = await this.apiKeyModel
      .findByIdAndUpdate(id, dto, { new: true })
      .select('-keyHash')
      .exec();

    if (!updated) {
      throw new NotFoundException(`ApiKey with ID ${id} not found`);
    }
    return updated;
  }

  /**
   * Revokes an API key (sets isActive to false).
   */
  async revoke(id: string): Promise<ApiKeyDocument> {
    const updated = await this.apiKeyModel
      .findByIdAndDelete(id)
      .select('-keyHash')
      .exec();

    if (!updated) {
      throw new NotFoundException(`ApiKey with ID ${id} not found`);
    }

    if (updated.webhookUrl) {
      await this.webhookEventService.create(
        String(updated._id),
        'apikey.revoked',
        { id: updated._id, name: updated.name },
      );
    }

    return updated;
  }

  /**
   * Updates lastUsedAt to now.
   */
  async updateLastUsed(id: string): Promise<void> {
    await this.apiKeyModel
      .findByIdAndUpdate(id, { lastUsedAt: new Date() })
      .exec();
  }
}
