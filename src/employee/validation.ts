import Joi from 'joi';

export function validate(employee: any) {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(50)
      .required(),
    vat: Joi.number()
      .min(9)
      .max(9)
      .required(),
    workStart: Joi.date().required(),
    workFinish: Joi.date().required(),
    employeeId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  };

  return Joi.validate(employee, schema);
}
