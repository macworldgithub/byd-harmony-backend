import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { ApiKeysService } from './api-key.service';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';

@Controller('api-keys')
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  /**
   * Creates a new API key. Returns the plaintext key once in the response.
   */
  @Post()
  async create(@Body() createApiKeyDto: CreateApiKeyDto) {
    return this.apiKeysService.create(createApiKeyDto);
  }

  /**
   * Retrieves all API keys.
   */
  @Get()
  async findAll(@Query('locationId') locationId?: string) {
    return this.apiKeysService.findAll(locationId);
  }

  /**
   * Retrieves a specific API key by ID.
   */
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.apiKeysService.findById(id);
  }

  /**
   * Updates a specific API key.
   */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateApiKeyDto: UpdateApiKeyDto,
  ) {
    return this.apiKeysService.update(id, updateApiKeyDto);
  }

  /**
   * Rotates a specific API key. Returns the new plaintext key once.
   */
  @Post(':id/rotate')
  @HttpCode(200)
  async rotate(@Param('id') id: string) {
    return this.apiKeysService.rotate(id);
  }

  /**
   * Revokes a specific API key.
   */
  @Delete(':id')
  async revoke(@Param('id') id: string) {
    return this.apiKeysService.revoke(id);
  }
}
