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
  UseGuards,
} from '@nestjs/common';
import { ApiKeysService } from './api-key.service';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { getEffectiveLocationId } from '../common/utils/location-access';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('api-keys')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api-keys')
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  /**
   * Creates a new API key. Returns the plaintext key once in the response.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new API key' })
  async create(@Body() createApiKeyDto: CreateApiKeyDto) {
    return this.apiKeysService.create(createApiKeyDto);
  }

  /**
   * Retrieves all API keys.
   */
  @Get()
  @ApiOperation({ summary: 'Retrieve all API keys' })
  @ApiQuery({ name: 'locationId', required: false, type: String })
  async findAll(@Query('locationId') locationId?: string, @CurrentUser() user?: any) {
    return this.apiKeysService.findAll(getEffectiveLocationId(user, locationId));
  }

  /**
   * Retrieves a specific API key by ID.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific API key by ID' })
  async findById(@Param('id') id: string, @CurrentUser() user?: any) {
    return this.apiKeysService.findById(id, getEffectiveLocationId(user));
  }

  /**
   * Updates a specific API key.
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific API key' })
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
  @ApiOperation({ summary: 'Rotate a specific API key' })
  async rotate(@Param('id') id: string) {
    return this.apiKeysService.rotate(id);
  }

  /**
   * Revokes a specific API key.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Revoke a specific API key' })
  async revoke(@Param('id') id: string) {
    return this.apiKeysService.revoke(id);
  }
}
