/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class Estimate {
  @IsNotEmpty()
  estimate: string[];
}
