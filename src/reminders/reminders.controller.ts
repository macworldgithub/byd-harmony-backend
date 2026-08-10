import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { CreateReminderDto, UpdateReminderDto } from './dto/reminder.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('reminders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new reminder' })
  create(@Body() createReminderDto: CreateReminderDto) {
    return this.remindersService.create(createReminderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reminders paginated' })
  findAll(@Query() query: any) {
    return this.remindersService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a reminder by id' })
  findOne(@Param('id') id: string) {
    return this.remindersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a reminder' })
  update(@Param('id') id: string, @Body() updateReminderDto: UpdateReminderDto) {
    return this.remindersService.update(id, updateReminderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a reminder' })
  remove(@Param('id') id: string) {
    return this.remindersService.remove(id);
  }
}
