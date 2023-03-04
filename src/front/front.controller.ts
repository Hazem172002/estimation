import { Controller, Get, Res } from '@nestjs/common';
import { FrontService } from './front.service';

@Controller('front')
export class FrontController {
  constructor(private frontService: FrontService) {}
  @Get()
  async systemFeatures(@Res() res) {
    return this.frontService.systemFeatures(res);
  }
}
