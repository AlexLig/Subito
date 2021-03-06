import {
  IsString,
  Length,
  IsNumberString,
  IsAlphanumeric,
  IsISO8601,
  IsMilitaryTime,
} from 'class-validator';
import { generalErrors as e } from '../shared';
import { employeeErrors as ey } from '../shared';

export class EmployeeDto {
  @IsString()
  readonly name: string;

  @IsNumberString({ message: e.INSERT_ONLY_NUMBERS })
  @IsAlphanumeric({ message: e.INSERT_ONLY_NUMBERS })
  @Length(9, 9, { message: e.VAT_LENGTH })
  readonly vat: string;

  @IsMilitaryTime({ message: ey.TIME_FORMAT })
  @IsISO8601()
  readonly startWork: string;

  @IsMilitaryTime({ message: ey.TIME_FORMAT })
  @IsISO8601()
  readonly endWork: string;

  @IsNumberString({ message: e.INSERT_ONLY_NUMBERS })
  @IsAlphanumeric({ message: e.INSERT_ONLY_NUMBERS })
  readonly employerId: string;
}
