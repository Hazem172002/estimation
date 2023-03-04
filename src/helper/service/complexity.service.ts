/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class Complexity {
  getValue(type: string) {
    switch (type) {
      case 'Learning Management System':
        return 30;
      case 'Workplace':
        return 30;
      case 'ODC Managment':
        return 30;
      case 'Job Hub':
        return 10;
      default:
        return 0;
    }
  }
}
