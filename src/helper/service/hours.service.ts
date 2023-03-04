/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class Hours {
  getValue(type: string) {
    switch (type) {
      case 'IOS':
        return 10000;
      case 'Android':
        return 10;
      case 'Web':
        return 1000;
      case 'Desktop':
        return 100;
      case 'dashboard':
        return 100;
      case 'navigationTabs':
        return 100;
      case 'notifications':
        return 10;
      case 'nightMode':
        return 10;
      case 'learnMore':
        return 10;
      case 'contactUs':
        return 10;
      case 'FAQ':
        return 10;
      case 'report':
        return 10;
      case 'learningManagmentSystem':
        return 100;
      case 'workPlace':
        return 100;
      case 'ODCManagment':
        return 100;
      case 'jopHub':
        return 100;
      default:
        return 0;
    }
  }
}
