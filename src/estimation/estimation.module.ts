import { Module } from '@nestjs/common';
import { Cost } from 'src/helper/service/cost.service';
import { Hours } from 'src/helper/service/hours.service';
import { ResponseService } from 'src/helper/service/response.service';
import { PrismaService } from 'src/prisma.service';
import { EstimationService } from './estimation.service';

@Module({
  providers: [PrismaService],
})
export class EstimationModule {}
