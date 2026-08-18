import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { getEffectiveLocationId } from '../common/utils/location-access';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('vehicles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new vehicle' })
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search vehicles' })
  search(@Query() query: any, @CurrentUser() user?: any) {
    return this.vehiclesService.search(query, getEffectiveLocationId(user));
  }

  @Get()
  @ApiOperation({ summary: 'Get all vehicles paginated' })
  findAll(@Query() query: any, @CurrentUser() user?: any) {
    return this.vehiclesService.findAll(query, getEffectiveLocationId(user));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a vehicle by id' })
  findOne(@Param('id') id: string, @CurrentUser() user?: any) {
    return this.vehiclesService.findOne(id, getEffectiveLocationId(user));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a vehicle' })
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a vehicle' })
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(id);
  }
}
