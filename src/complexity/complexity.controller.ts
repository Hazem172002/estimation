import { Controller, Get, Body, Res, ValidationPipe } from '@nestjs/common';
import { ComplexityService } from './complexity.service';
import { Complexity } from './dto/complexity.dto';

@Controller('complexity')
export class ComplexityController {
  constructor(private complexityService: ComplexityService) {}
  @Get()
  calculateComplexity(
    @Body(new ValidationPipe({ transform: true })) body: Complexity,
    @Res() res,
  ) {
    return this.complexityService.calculateComplexity(body, res);
  }
}
