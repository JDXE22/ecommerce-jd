import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('OrderDetails')
@Controller('orderDetails')
export class OrderDetailsController {}
