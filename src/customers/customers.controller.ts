import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { getEffectiveLocationId } from '../common/utils/location-access';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search customers for dropdowns' })
  @ApiQuery({ name: 'q', required: true })
  @ApiQuery({ name: 'locationId', required: false, type: String })
  search(@Query('q') q: string, @Query('locationId') locationId?: string, @CurrentUser() user?: any) {
    return this.customersService.search(q, getEffectiveLocationId(user, locationId));
  }

  @Get()
  @ApiOperation({ summary: 'Get all customers paginated' })
  @ApiQuery({ name: 'locationId', required: false, type: String })
  findAll(@Query() query: any, @Query('locationId') locationId?: string, @CurrentUser() user?: any) {
    return this.customersService.findAll(query, getEffectiveLocationId(user, locationId));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer by id' })
  findOne(@Param('id') id: string, @CurrentUser() user?: any) {
    return this.customersService.findOne(id, getEffectiveLocationId(user));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a customer' })
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a customer' })
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
