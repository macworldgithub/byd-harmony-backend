import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { BulkCampaignsService } from './bulk-campaigns.service';
import { CreateBulkCampaignDto } from './dto/create-bulk-campaign.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Assuming JWT auth is used, uncomment if needed

@ApiTags('bulk-campaigns')
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('bulk-campaigns')
export class BulkCampaignsController {
  constructor(private readonly bulkCampaignsService: BulkCampaignsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new bulk campaign' })
  @ApiResponse({ status: 201, description: 'The campaign has been successfully created.' })
  create(@Body() createBulkCampaignDto: CreateBulkCampaignDto) {
    return this.bulkCampaignsService.create(createBulkCampaignDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bulk campaigns' })
  @ApiResponse({ status: 200, description: 'Return all campaigns sorted by createdAt descending.' })
  findAll() {
    return this.bulkCampaignsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single bulk campaign by ID' })
  @ApiResponse({ status: 200, description: 'Return the campaign.' })
  @ApiResponse({ status: 404, description: 'Campaign not found.' })
  findOne(@Param('id') id: string) {
    return this.bulkCampaignsService.findOne(id);
  }

  @Post(':id/send')
  @ApiOperation({ summary: 'Send a bulk campaign' })
  @ApiResponse({ status: 200, description: 'Campaign sending initiated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid request or campaign is not in draft status.' })
  @ApiResponse({ status: 404, description: 'Campaign not found.' })
  sendCampaign(@Param('id') id: string) {
    return this.bulkCampaignsService.sendCampaign(id);
  }
}
