/* eslint-disable prettier/prettier */

import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class Feature {
  @IsNotEmpty()
  @IsArray()
  feature: string[];
  @IsNotEmpty()
  @IsString()
  userId: string;
}
