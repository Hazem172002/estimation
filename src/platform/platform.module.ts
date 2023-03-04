import { Module } from '@nestjs/common';
import { ResponseService } from 'src/helper/service/response.service';
import { PrismaService } from 'src/prisma.service';
import { PlatformService } from './platform.service';

@Module({
  providers: [PrismaService, PlatformService, ResponseService],
})
export class PlatformModule {}
