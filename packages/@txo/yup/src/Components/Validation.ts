/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2019-06-26T13:06:63+02:00
 * @Copyright: Technology Studio
 **/

/* eslint-disable @typescript-eslint/ban-types */

import {
  string,
  object,
  date,
  array,
  Shape,
  StringSchema,
  ObjectSchema,
  DateSchema,
  NullableArraySchema,
} from 'yup'

export const SUPPRESS_ERROR_MESSAGE = 'suppress-error-message'

export const stringSchema = (): StringSchema<string | null | undefined> => string().trim().nullable()
export const requiredStringSchema = (): StringSchema<string | null> => string().trim().required().nullable()

export const relationSchema = (
  options: { idKey?: string } = {},
): ObjectSchema<object & { [key: string]: string | null | undefined } | undefined> => (
  object().shape({
    [options.idKey ?? 'id']: stringSchema(),
  })
)

export const requiredRelationSchema = (
  options: { idKey?: string, default?: string } = {},
): ObjectSchema<Shape<object | undefined, { [key: string]: string | undefined | null }>> => (
  object().requiredRelation(options.idKey).shape({
    [options.idKey ?? 'id']: stringSchema().meta({ default: options.default }),
  })
)

export const dateSchema = (): DateSchema<Date | undefined | null, object> => date().nullable()
export const requiredDateSchema = (): DateSchema<Date | null, object> => date().nullable().required()

export const numberSchema = (): StringSchema<string | null | undefined> => string().numbersOnly().nullable()
export const requiredNumberSchema = (): StringSchema<string | null> => string().numbersOnly().nullable().required()

export const phoneNumberSchema = (): StringSchema<string | null | undefined> => string().trim().phoneNumber()
export const requiredPhoneNumberSchema = (): StringSchema<string | null> => string().trim().phoneNumber().required()

export const requiredArraySchema = (): NullableArraySchema<unknown, object> => array().required().nullable()
