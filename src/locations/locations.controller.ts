import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto, UpdateLocationDto } from './dto/location.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { getEffectiveLocationId } from '../common/utils/location-access';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('locations')
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new location' })
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Get('dropdown')
  @ApiOperation({ summary: 'Get lightweight list of active locations' })
  getDropdown(@CurrentUser() user?: any) {
    return this.locationsService.getDropdown(getEffectiveLocationId(user));
  }

  @Get()
  @ApiOperation({ summary: 'Get all locations' })
  @ApiQuery({ name: 'isActive', required: false })
  @ApiQuery({ name: 'type', required: false })
  findAll(@Query() query: any, @CurrentUser() user?: any) {
    return this.locationsService.findAll(query, getEffectiveLocationId(user));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a location by id' })
  findOne(@Param('id') id: string, @CurrentUser() user?: any) {
    return this.locationsService.findOne(id, getEffectiveLocationId(user));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a location' })
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationsService.update(id, updateLocationDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft delete a location' })
  remove(@Param('id') id: string) {
    return this.locationsService.remove(id);
  }
}
