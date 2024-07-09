import { ObjectId } from 'mongodb';
import { IsString, IsInt,IsOptional, Min, IsDate, IsBoolean, IsUrl, IsMongoId} from 'class-validator';


export class Pet {
  @IsMongoId()
  @IsOptional()
  _id!: ObjectId;

  @IsString()
  name!: string;

  @IsString()
  species!: string;

  @IsInt()
  @Min(1950)
  birthYear!: number;

  @IsBoolean()
  available!: boolean;

  @IsUrl()
  @IsOptional()
  photoUrl: URL | null=null


  // This is added when create API is triggered
  @IsDate()
  @IsString()
  @IsOptional()
  dateAdded!: Date;

  // This is added when update API is triggered
  @IsDate()
  @IsString()
  @IsOptional()
  dateUpdated!: Date;
}