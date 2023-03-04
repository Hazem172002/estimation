/* eslint-disable prettier/prettier */

import { IsNotEmpty } from 'class-validator';

export class Complexity {
  @IsNotEmpty()
  functionalties: string[];
}
