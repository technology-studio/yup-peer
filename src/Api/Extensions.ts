/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date:   2019-02-18T22:58:32+01:00
 * @Copyright: Technology Studio
**/

import type {
  StringSchema,
  ObjectSchema,
  ObjectShape,
  StringLocale,
  ObjectLocale,
  Message,
} from 'yup'
import {
  addMethod,
  string,
  object,
  ref,
  setLocale as _setLocale,
  ValidationError,
} from 'yup'
import { parsePhoneNumber } from 'awesome-phonenumber'
import { Log } from '@txo/log'
import { isObject } from '@txo/types'

import { type LocaleObject } from '../Model/Types'

const log = new Log('App.Modules.Yup.Api.Extensions')

export const yupParam = (key: string, placeholder?: string): Record<string, string> => ({
  [key]: `\${${placeholder ?? key}}`,
})

let _localization: LocaleObject = {}

export const setLocale = (localization: LocaleObject): void => {
  _localization = localization
  _setLocale(localization)
}

addMethod<StringSchema>(string, 'equalsTo', function (
  key: string,
  message: Message | undefined = (_localization.string as StringLocale)?.equalsTo,
) {
  log.debug('equalsTo', { key, message })
  return this.test({
    name: 'equalsTo',
    exclusive: false,
    message,
    test: function (value: unknown) {
      return value === this.resolve(ref(key))
    },
  })
})

addMethod<StringSchema>(string, 'phoneNumber', function (
  ref: unknown,
  message: Message | undefined = (_localization.string as StringLocale)?.phoneNumber,
) {
  return this.test({
    name: 'phoneNumber',
    exclusive: false,
    message,
    test: function (value: unknown) {
      return value == null || parsePhoneNumber(value as string).valid
    },
  })
})

addMethod<StringSchema>(string, 'numeric', function (
  message: Message | undefined = (_localization.string as StringLocale)?.numeric,
) {
  return this.matches(/[\d.,]+/, message)
})

addMethod<StringSchema>(string, 'numbersOnly', function (
  message: Message | undefined = (_localization.string as StringLocale)?.numbersOnly,
) {
  return this.matches(/[\d]+/, message)
})

addMethod<ObjectSchema<ObjectShape>>(object, 'requiredRelation', function (
  idKey: string | undefined = 'id',
  message: Message | undefined = _localization.mixed?.required,
) {
  return this.test({
    name: 'requiredRelation',
    exclusive: false,
    message,
    test: function (value: unknown): boolean {
      if ((Boolean(value)) && isObject(value)) {
        const _value = value as Record<string, string>
        return !!(typeof _value[idKey] === 'string' && (_value[idKey].length > 0))
      }
      return false
    },
  })
})

addMethod<ObjectSchema<ObjectShape>>(object, 'atLeastOneRequired', function (
  keys: string[],
  message: Message | undefined = (_localization.object as ObjectLocale)?.atLeastOneRequired,
) {
  return this.test({
    name: 'atLeastOneRequired',
    exclusive: false,
    message,
    test: function (value: unknown): boolean | ValidationError {
      if ((Boolean(value)) && isObject(value)) {
        const isValid = keys.some((key) => (value as Record<string, string>)[key])
        return isValid || new ValidationError(message as string, value, 'atLeastOneRequired')
      }
      return false
    },
  },
  )
})
