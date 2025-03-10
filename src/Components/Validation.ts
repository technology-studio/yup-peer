/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2019-06-26T13:06:63+02:00
 * @Copyright: Technology Studio
 **/

import type {
  StringSchema,
  ObjectSchema,
  DateSchema,
  ArraySchema,
  AnySchema,
  AnyObject,
} from 'yup'
import {
  string,
  object,
  date,
  array,
} from 'yup'

export const SUPPRESS_ERROR_MESSAGE = 'suppress-error-message'

export const stringSchema = (): StringSchema<string | null | undefined> => string().trim().nullable()
export const requiredStringSchema = (): StringSchema<string | null | undefined> => string().trim().required().nullable()

export const relationSchema = (
  options: { idKey?: string } = {},
// @ts-expect-error -- NOTE: yup does not return schema, instead it returns the value of given schema
): ObjectSchema<Record<string, StringSchema<string | null | undefined>>> => (
) => (
  object().shape({
    [options.idKey ?? 'id']: stringSchema(),
  })
)

export const requiredRelationSchema = (
  options: { idKey?: string, default?: string } = {},
): ObjectSchema<Record<string, StringSchema<string | null | undefined>>> => (
  // @ts-expect-error -- NOTE: yup does not return schema, instead it returns the value of given schema
  object().requiredRelation(options.idKey).shape({
    [options.idKey ?? 'id']: stringSchema().meta({ default: options.default }),
  })
)

export const dateSchema = (): DateSchema<Date | undefined | null, object> => date().nullable()
export const requiredDateSchema = (): DateSchema<Date | null | undefined, object> => date().nullable().required()

export const numberSchema = (): StringSchema<string | null | undefined> => string().numbersOnly().nullable()
export const requiredNumberSchema = (): StringSchema<string | null | undefined> => string().numbersOnly().nullable().required()

export const phoneNumberSchema = (): StringSchema<string | null | undefined> => string().trim().phoneNumber()
export const requiredPhoneNumberSchema = (): StringSchema<string | null | undefined> => string().trim().phoneNumber().required()

// @ts-expect-error -- NOTE: yup does not return schema, instead it returns the value of given schema
export const requiredArraySchema = (): ArraySchema<AnySchema, AnyObject, unknown[] | null | undefined> => array().required().nullable()
