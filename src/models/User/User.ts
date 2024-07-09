import { ObjectId } from 'mongodb';
import { IsString } from 'class-validator';

// @TODO: develop User Module later if needed
export class User {
  @IsString()
  _id!: ObjectId;

  @IsString()
  name!: string;

  @IsString()
  type!: string;

  @IsString()
  password!: string;
}