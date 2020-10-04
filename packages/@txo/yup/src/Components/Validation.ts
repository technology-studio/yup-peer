/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2019-06-26T13:06:63+02:00
 * @Copyright: Technology Studio
 **/

/* eslint-disable @typescript-eslint/ban-types */

import Yup, {
  Shape,
  StringSchema,
  ObjectSchema,
  DateSchema,
  NullableArraySchema,
} from 'yup'

export const SUPPRESS_ERROR_MESSAGE = 'suppress-error-message'

export const stringSchema = (): StringSchema<string | null | undefined> => Yup.string().trim().nullable()
export const requiredStringSchema = (): StringSchema<string | null> => Yup.string().trim().required().nullable()

export const relationSchema = (): ObjectSchema<object & { id: string | null | undefined } | undefined> => (
  Yup.object().shape({
    id: stringSchema(),
  })
)

export const requiredRelationSchema = (options: { default?: string } = {}): ObjectSchema<Shape<object | undefined, { id: string | undefined | null }>> => (
  Yup.object().requiredRelation().shape({
    id: stringSchema().meta({ default: options.default }),
  })
)

export const dateSchema = (): DateSchema<Date | undefined | null, object> => Yup.date().nullable()
export const requiredDateSchema = (): DateSchema<Date | null, object> => Yup.date().nullable().required()

export const numberSchema = (): StringSchema<string | null | undefined> => Yup.string().numbersOnly().nullable()
export const requiredNumberSchema = (): StringSchema<string | null> => Yup.string().numbersOnly().nullable().required()

export const phoneNumberSchema = (): StringSchema<string | null | undefined> => Yup.string().trim().phoneNumber()
export const requiredPhoneNumberSchema = (): StringSchema<string | null> => Yup.string().trim().phoneNumber().required()

export const requiredArraySchema = (): NullableArraySchema<unknown, object> => Yup.array().required().nullable()
