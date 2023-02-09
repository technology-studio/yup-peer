/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2019-06-26T13:06:63+02:00
 * @Copyright: Technology Studio
 **/

/* eslint-disable @typescript-eslint/ban-types */

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
): ObjectSchema<{ [x: string]: StringSchema<string | null | undefined> }> => (
  object().shape({
    [options.idKey ?? 'id']: stringSchema(),
  })
)

export const requiredRelationSchema = (
  options: { idKey?: string, default?: string } = {},
): ObjectSchema<{ [x: string]: StringSchema<string | null | undefined> }> => (
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

export const requiredArraySchema = (): ArraySchema<AnySchema, AnyObject, unknown[] | null | undefined> => array().required().nullable()
