import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CustomerThreadsService } from './customer-threads.service';
import { CreateThreadEntryDto } from './dto/customer-thread.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('customer-threads')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('customers/:customerId/thread')
export class CustomerThreadsController {
  constructor(private readonly threadsService: CustomerThreadsService) {}

  @Get()
  @ApiOperation({ summary: 'Get thread entries for a customer' })
  @ApiParam({ name: 'customerId', description: 'Customer MongoDB ID' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(
    @Param('customerId') customerId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const result = await this.threadsService.findByCustomer(
      customerId,
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 50,
    );
    return { success: true, ...result };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Post a new thread entry for a customer' })
  @ApiParam({ name: 'customerId', description: 'Customer MongoDB ID' })
  async create(
    @Param('customerId') customerId: string,
    @Body() dto: CreateThreadEntryDto,
    @CurrentUser() user: any,
  ) {
    const entry = await this.threadsService.create(customerId, dto, user);
    return { success: true, data: entry };
  }

  @Delete(':entryId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft-delete a thread entry' })
  @ApiParam({ name: 'customerId', description: 'Customer MongoDB ID' })
  @ApiParam({ name: 'entryId', description: 'Thread entry MongoDB ID' })
  async remove(@Param('entryId') entryId: string) {
    await this.threadsService.remove(entryId);
    return { success: true };
  }
}
