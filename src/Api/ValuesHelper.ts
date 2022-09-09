/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2020-10-21T23:10:95+02:00
 * @Copyright: Technology Studio
**/

import type {
  SchemaFieldDescription, SchemaDescription, SchemaFieldRefDescription, SchemaFieldInnerTypeDescription,
} from 'yup'
import { isObject } from '@txo/functional'

export type Values = string | number | boolean | null | {
  [key: string]: Values,
}

const isSchemaDescription = (description?: SchemaFieldDescription): description is SchemaDescription => description?.type === 'object'

const isSchemaFieldRefDescription = (description?: SchemaFieldDescription): description is SchemaFieldRefDescription => description?.type === 'ref'

const isSchemaArrayRefDescription = (description?: SchemaFieldDescription): description is SchemaFieldInnerTypeDescription => description?.type === 'array'

export const removeValuesNotPresentInSchema = (description?: SchemaFieldDescription, values?: Values): Values | undefined => {
  if (isSchemaDescription(description) && isObject(values)) {
    const { fields } = description
    let modified = false
    const nextValues = Object.keys(values).reduce((nextValues: { [key: string]: Values }, key: string) => {
      if (key in fields) {
        const subValues = values[key]
        const nextSubValues = removeValuesNotPresentInSchema(fields[key], subValues)
        if (nextSubValues !== undefined) {
          if (nextSubValues !== subValues) {
            modified = true
          }
          nextValues[key] = nextSubValues
        }
      } else {
        modified = true
      }
      return nextValues
    }, {})

    return modified ? nextValues : values
  } else if (isSchemaArrayRefDescription(description)) {
    if (Array.isArray(values)) {
      let modified = false
      const nextValues = values.reduce((nextValues: Values[], subValues: Values) => {
        const nextSubValues = removeValuesNotPresentInSchema(description.innerType, subValues)

        if (nextSubValues !== undefined) {
          if (nextSubValues !== subValues) {
            modified = true
          }
          nextValues.push(nextSubValues)
        }
        return nextValues
      }, [])
      return modified ? nextValues : values
    }
  } else if (!isSchemaFieldRefDescription(description)) {
    return values
  }
}
