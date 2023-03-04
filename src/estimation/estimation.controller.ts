import {
  Controller,
  Get,
  Body,
  ValidationPipe,
  Res,
  Post,
} from '@nestjs/common';
import { Estimate } from './dto/estimation.dto';
import { Feature } from './dto/feature.dto';
import { Form } from './dto/form.dto';
import { EstimationService } from './estimation.service';

@Controller('estimation')
export class EstimationController {
  constructor(private estimationService: EstimationService) {}
  @Get()
  getEstimation(
    @Body(new ValidationPipe({ transform: true })) body: Estimate,
    @Res() res,
  ) {
    return this.estimationService.getEstimation(body, res);
  }
  @Get('user-features')
  async userFeatures(
    @Body(new ValidationPipe({ transform: true })) body: Form,
    @Res() res,
  ) {
    return this.estimationService.userFeatures(body, res);
  }
  @Post('add-feature')
  async addFeature(
    @Body(new ValidationPipe({ transform: true })) body: Feature,
    @Res() res,
  ) {
    return this.estimationService.addFeature(body, res);
  }
}
