import {
  Controller,
  Get,
  ValidationPipe,
  Res,
  Post,
  Body,
} from '@nestjs/common';
import { Platforms } from './dto/platform.dto';
import { PlatformService } from './platform.service';

@Controller('platform')
export class PlatformController {
  constructor(private platformService: PlatformService) {}
  @Get()
  async platforms(@Res() res) {
    return this.platformService.platforms(res);
  }
  @Post()
  async addPlatform(
    @Body(new ValidationPipe({ transform: true })) body: Platforms,
    @Res() res,
  ) {
    return this.platformService.addPlatform(body, res);
  }
}
