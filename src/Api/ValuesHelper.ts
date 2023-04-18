/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2020-10-21T23:10:95+02:00
 * @Copyright: Technology Studio
**/

import type {
  SchemaFieldDescription,
  SchemaObjectDescription,
  SchemaRefDescription,
  SchemaInnerTypeDescription,
} from 'yup'
import { isObject } from '@txo/functional'

export type Values = string | number | boolean | null | {
  [key: string]: Values,
}

const isSchemaObjectDescription = (description?: SchemaFieldDescription): description is SchemaObjectDescription => 'fields' in (description ?? {})

const isSchemaFieldRefDescription = (description?: SchemaFieldDescription): description is SchemaRefDescription => description?.type === 'ref'

const isSchemaArrayRefDescription = (description?: SchemaFieldDescription): description is SchemaInnerTypeDescription => description?.type === 'array'

export const removeValuesNotPresentInSchema = (description?: SchemaFieldDescription, values?: Values): Values | undefined => {
  if (isSchemaObjectDescription(description) && isObject(values)) {
    const { fields } = description
    let modified = false
    const nextValues = Object.keys(values).reduce((nextValues: Record<string, Values>, key: string) => {
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
        let nextSubValues: Values | undefined = subValues
        if (Array.isArray(description.innerType)) {
          description.innerType.forEach((innerType) => {
            nextSubValues = removeValuesNotPresentInSchema(innerType, nextSubValues)
          })
        } else {
          nextSubValues = removeValuesNotPresentInSchema(description.innerType, nextSubValues)
        }

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
