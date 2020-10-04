/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2019-05-13T19:05:60+02:00
 * @Copyright: Technology Studio
**/

import { Log } from '@txo/log'

const log = new Log('app.Modules.Yup.Api.GenerateInitialValues')

type PrimitiveDescription = {
  type: 'string' | 'number' | 'boolean',
  meta?: {
    default: string | number | boolean,
  },
}

type ObjectDescription = {
  type: 'object',
  fields: {
    [key: string]: ObjectDescription | PrimitiveDescription,
  },
}

export type InitialValues = string | number | boolean | null | {
  [key: string]: InitialValues,
}

export const generateInitialValues = (description: ObjectDescription | PrimitiveDescription): InitialValues => {
  log.debug('generateInitialValues', description)
  if (description.type === 'object') {
    const { fields } = description
    return Object.keys(fields).reduce((initialValues: { [key: string]: InitialValues }, key: string) => {
      initialValues[key] = generateInitialValues(fields[key])
      return initialValues
    }, {})
  }
  return description?.meta?.default ?? null
}
