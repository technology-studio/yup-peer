/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2023-04-19T10:04:00+02:00
 * @Copyright: Technology Studio
**/

import * as Yup from 'yup'

import { removeValuesNotPresentInSchema } from '../../src/Api/ValuesHelper'

test('should remove values not present in schema', () => {
  const validationSchema = Yup.object().shape({
    keyA: Yup.string().nullable().required(),
    keyB: Yup.number().nullable().required(),
  })
  const values = {
    keyA: 'valueA',
    keyB: 2,
    keyC: 'valueC',
  }

  const nextValues = removeValuesNotPresentInSchema(validationSchema.describe(), values)

  expect(nextValues).toEqual({
    keyA: 'valueA',
    keyB: 2,
  })
})

test('should remove values not present in tuple schema', () => {
  const tupleValidationSchema = Yup.tuple([
    Yup.string().nullable().required(),
    Yup.number().nullable().required(),
  ])
  const values = [
    'valueA',
    2,
    'valueC',
  ] as [string, number, string]

  const nextValues = removeValuesNotPresentInSchema(tupleValidationSchema.describe(), values)

  expect(nextValues).toEqual([
    'valueA',
    2,
  ])
})
