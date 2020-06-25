/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2019-05-13T19:05:60+02:00
 * @Copyright: Technology Studio
 * @flow
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
    [string]: ObjectDescription | PrimitiveDescription,
  },
}

export const generateInitialValues = (description: ObjectDescription | PrimitiveDescription): Object => {
  log.debug('generateInitialValues', description)
  if (description.type === 'object') {
    const { fields } = description
    return Object.keys(fields).reduce((initialValues, key) => {
      initialValues[key] = generateInitialValues(fields[key])
      return initialValues
    }, {})
  }
  return description?.meta?.default ?? null
}
