import { Injectable } from '@nestjs/common';
import { Complexity } from 'src/helper/service/complexity.service';
import { ResponseService } from 'src/helper/service/response.service';

@Injectable()
export class ComplexityService {
  constructor(
    private responseService: ResponseService,
    private complexity: Complexity,
  ) {}
  calculateComplexity(body, res) {
    let { functionalties } = body;
    const rejected = [];
    let complexity = 0;
    if (typeof functionalties === 'string') {
      complexity = this.complexity.getValue(functionalties);
      if (complexity === 0) {
        return this.responseService.conflict(
          res,
          'this fetures is not in my db',
        );
      }
      return this.responseService.success(
        res,
        'Complexity Calulated Successfully',
        { complexity },
      );
    }
    functionalties = [...new Set(functionalties)];
    functionalties.map((a) => {
      if (this.complexity.getValue(a) === 0) {
        rejected.push(a);
      }
      complexity += this.complexity.getValue(a);
    });
    if (rejected.length > 0) {
      return this.responseService.success(
        res,
        'Complexity Calulated but this features is not in my db',
        { complexity: complexity, rejectedFeatures: rejected },
      );
    }
    return this.responseService.success(
      res,
      'Complexity Calulated Successfully',
      { complexity },
    );
  }
}
