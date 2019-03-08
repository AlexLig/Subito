import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Employee } from '../employee/entity';
import { CreateEmployeeDto } from '../employee/dto';

const validation = (cls: any) => async (data: object): Promise<any | Error> => {
  const objToValidate = plainToClass(cls, data);
  const errors = await validate(objToValidate, { whitelist: true });
  if (errors.length > 0) throw new Error('Validation Failed');
  return objToValidate;
};

export const validateEmployee = validation(Employee);
export const validateCreateEmployeeDto = validation(CreateEmployeeDto);
