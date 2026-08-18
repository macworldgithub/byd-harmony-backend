import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ScheduleDeliveriesService } from './schedule-deliveries.service';
import { CreateScheduleDeliveryDto } from './dto/create-schedule-delivery.dto';
import { UpdateScheduleDeliveryDto } from './dto/update-schedule-delivery.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { getEffectiveLocationId } from '../common/utils/location-access';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('schedule-deliveries')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('schedule-deliveries')
export class ScheduleDeliveriesController {
  constructor(private readonly scheduleDeliveriesService: ScheduleDeliveriesService) {}

  @Post()
  create(@Body() createScheduleDeliveryDto: CreateScheduleDeliveryDto) {
    return this.scheduleDeliveriesService.create(createScheduleDeliveryDto);
  }

  @Get()
  @ApiQuery({ name: 'locationId', required: false, type: String })
  findAll(@Query('locationId') locationId?: string, @CurrentUser() user?: any) {
    return this.scheduleDeliveriesService.findAll(getEffectiveLocationId(user, locationId));
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user?: any) {
    return this.scheduleDeliveriesService.findOne(id, getEffectiveLocationId(user));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScheduleDeliveryDto: UpdateScheduleDeliveryDto) {
    return this.scheduleDeliveriesService.update(id, updateScheduleDeliveryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleDeliveriesService.remove(id);
  }
}
