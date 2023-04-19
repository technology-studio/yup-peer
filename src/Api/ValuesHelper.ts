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
} | Values[]

const isSchemaObjectDescription = (description?: SchemaFieldDescription): description is SchemaObjectDescription => 'fields' in (description ?? {})

const isSchemaFieldRefDescription = (description?: SchemaFieldDescription): description is SchemaRefDescription => description?.type === 'ref'

const isSchemaArrayRefDescription = (description?: SchemaFieldDescription): description is SchemaInnerTypeDescription => description?.type === 'array'

const isSchemaTupleRefDescription = (description?: SchemaFieldDescription): description is SchemaInnerTypeDescription => description?.type === 'tuple'

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
        const nextSubValues = removeValuesNotPresentInSchema(description.innerType as SchemaInnerTypeDescription, subValues)

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
  } else if (isSchemaTupleRefDescription(description)) {
    if (Array.isArray(values)) {
      let modified = false
      const nextValues = values.reduce((nextValues: Values[], subValues: Values, index: number): Values[] => {
        const innerType = (description.innerType as SchemaFieldDescription[])[index]
        if (innerType != null) {
          const nextValue = removeValuesNotPresentInSchema(innerType, subValues)
          if (nextValue != null) {
            nextValues.push(nextValue)
          }
          if (nextValue !== subValues) {
            modified = true
          }
        } else {
          modified = true
        }
        return nextValues
      }, [])

      return modified ? nextValues : values
    }
  } else if (!isSchemaFieldRefDescription(description)) {
    return values
  }
}
