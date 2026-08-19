import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { getEffectiveLocationId } from '../common/utils/location-access';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('bookings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bookings paginated' })
  @ApiQuery({ name: 'locationId', required: false, type: String })
  findAll(@Query() query: any, @Query('locationId') locationId?: string, @CurrentUser() user?: any) {
    return this.bookingsService.findAll(query, getEffectiveLocationId(user, locationId));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a booking by id' })
  findOne(@Param('id') id: string, @CurrentUser() user?: any) {
    return this.bookingsService.findOne(id, getEffectiveLocationId(user));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a booking' })
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a booking' })
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(id);
  }
}
