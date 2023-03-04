import { Module } from '@nestjs/common';
import { EstimationService } from './estimation.service';

@Module({
  providers: [EstimationService]
})
export class EstimationModule {}
