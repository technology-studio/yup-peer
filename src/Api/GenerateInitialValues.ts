/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2019-05-13T19:05:60+02:00
 * @Copyright: Technology Studio
**/

import { Log } from '@txo/log'
import type {
  SchemaFieldDescription,
  SchemaObjectDescription,
  SchemaRefDescription,
} from 'yup'

const log = new Log('app.Modules.Yup.Api.GenerateInitialValues')

export type InitialValues = string | number | boolean | null | {
  [key: string]: InitialValues,
}

const isSchemaObjectDescription = (description?: SchemaFieldDescription): description is SchemaObjectDescription => 'fields' in (description ?? {})

const isSchemaFieldRefDescription = (description: SchemaFieldDescription): description is SchemaRefDescription => description.type === 'ref'
export const generateInitialValues = (description: SchemaFieldDescription): InitialValues => {
  log.debug('generateInitialValues', description)
  if (isSchemaObjectDescription(description)) {
    const { fields } = description
    return Object.keys(fields).reduce((initialValues: Record<string, InitialValues>, key: string) => {
      initialValues[key] = generateInitialValues(fields[key])
      return initialValues
    }, {})
  } else if (!isSchemaFieldRefDescription(description)) {
    return (description?.meta as Record<string, InitialValues>)?.default ?? null
  }
  return null
}
