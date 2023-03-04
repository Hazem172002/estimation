import { Injectable } from '@nestjs/common';
import { ResponseService } from 'src/helper/service/response.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FrontService {
  constructor(
    private prisma: PrismaService,
    private responseService: ResponseService,
  ) {}
  async systemFeatures(res) {
    return this.responseService.success(res, 'as', {});
  }
}
