/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2019-06-26T13:06:63+02:00
 * @Copyright: Technology Studio
 * @flow
**/

import * as Yup from 'yup'

export const SUPPRESS_ERROR_MESSAGE = 'suppress-error-message'

export const stringSchema = () => Yup.string().trim().nullable()
export const requiredStringSchema = () => Yup.string().trim().required().nullable()

export const relationSchema = () => Yup.object().shape({
  id: stringSchema(),
})
export const requiredRelationSchema = (options: { default?: string } = {}) => Yup.object().requiredRelation().shape({
  id: requiredStringSchema().meta({ default: options.default }),
})

export const requiredDateSchema = () => Yup.date().nullable().required()
export const dateSchema = () => Yup.date().nullable()

export const numberSchema = () => Yup.number().numbersOnly().nullable()
export const requiredNumberSchema = () => Yup.string().numbersOnly().nullable().required()

export const phoneNumberSchema = () => Yup.string().trim().phoneNumber()
export const requiredPhoneNumberSchema = () => Yup.string().trim().phoneNumber().required()
