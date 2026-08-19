import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { JobCardsService } from './job-cards.service';
import { CreateJobCardDto, UpdateJobCardDto, JobCardItemDto } from './dto/job-card.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { getEffectiveLocationId } from '../common/utils/location-access';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('job-cards')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('job-cards')
export class JobCardsController {
  constructor(private readonly jobCardsService: JobCardsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new job card' })
  create(@Body() createJobCardDto: CreateJobCardDto) {
    return this.jobCardsService.create(createJobCardDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all job cards paginated' })
  @ApiQuery({ name: 'locationId', required: false, type: String })
  findAll(@Query() query: any, @Query('locationId') locationId?: string, @CurrentUser() user?: any) {
    return this.jobCardsService.findAll(query, getEffectiveLocationId(user, locationId));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a job card by id' })
  findOne(@Param('id') id: string, @CurrentUser() user?: any) {
    return this.jobCardsService.findOne(id, getEffectiveLocationId(user));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a job card' })
  update(@Param('id') id: string, @Body() updateJobCardDto: UpdateJobCardDto) {
    return this.jobCardsService.update(id, updateJobCardDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a job card' })
  remove(@Param('id') id: string) {
    return this.jobCardsService.remove(id);
  }

  @Post(':id/items')
  @ApiOperation({ summary: 'Add item to job card' })
  addItem(@Param('id') id: string, @Body() itemDto: JobCardItemDto) {
    return this.jobCardsService.addItem(id, itemDto);
  }

  @Put(':id/items/:itemId')
  @ApiOperation({ summary: 'Update item in job card' })
  updateItem(@Param('id') id: string, @Param('itemId') itemId: string, @Body() itemDto: any) {
    return this.jobCardsService.updateItem(id, itemId, itemDto);
  }

  @Delete(':id/items/:itemId')
  @ApiOperation({ summary: 'Remove item from job card' })
  removeItem(@Param('id') id: string, @Param('itemId') itemId: string) {
    return this.jobCardsService.removeItem(id, itemId);
  }
}
