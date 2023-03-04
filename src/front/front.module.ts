import { Module } from '@nestjs/common';
import { FrontService } from './front.service';
import { FrontController } from './front.controller';
import { PrismaService } from 'src/prisma.service';
import { ResponseService } from 'src/helper/service/response.service';

@Module({
  providers: [FrontService, PrismaService, ResponseService],
  controllers: [FrontController],
})
export class FrontModule {}
