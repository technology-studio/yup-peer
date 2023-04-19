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

test('should return same values reference with matching array schema of object schemas', () => {
  const validationSchema = Yup.array().of(
    Yup.object().shape({ a: Yup.string().nullable().required() }),
  )
  const values = [
    { a: 'valueA' },
    undefined,
    null,
    { a: 'valueD' },
  ]

  const nextValues = removeValuesNotPresentInSchema(validationSchema.describe(), values)

  expect(nextValues).toEqual([
    { a: 'valueA' },
    undefined,
    null,
    { a: 'valueD' },
  ])
  expect(nextValues).toBe(values)
})

test('should not remove nillable values in cleaned array with array schema of object schemas', () => {
  const validationSchema = Yup.array().of(
    Yup.object().shape({ a: Yup.string().nullable().required() }),
  )
  const values = [
    { a: 'valueA' },
    undefined,
    null,
    { a: 'valueD', b: 'valueE' },
  ]

  const nextValues = removeValuesNotPresentInSchema(validationSchema.describe(), values)

  expect(nextValues).toEqual([
    { a: 'valueA' },
    undefined,
    null,
    { a: 'valueD' },
  ])
})

test('should remove values not present in tuple schema', () => {
  const tupleValidationSchema = Yup.tuple([
    Yup.string().nullable().required(),
    Yup.number().nullable().required(),
    Yup.boolean().nullable().required(),
  ])
  const values = [
    'valueA',
    2,
    true,
    'valueB',
  ] as [string, number, boolean, string]

  const nextValues = removeValuesNotPresentInSchema(tupleValidationSchema.describe(), values)

  expect(nextValues).toEqual([
    'valueA',
    2,
    true,
  ])
})
