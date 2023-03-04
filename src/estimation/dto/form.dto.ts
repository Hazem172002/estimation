/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from 'class-validator';

export class Form {
  @IsNotEmpty()
  @IsString()
  userId: string;
}
