/* eslint-disable prettier/prettier */

import { IsNotEmpty } from 'class-validator';

export class Platforms {
  @IsNotEmpty()
  platform: string[];
}
