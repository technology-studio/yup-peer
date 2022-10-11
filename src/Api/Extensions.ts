/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date:   2019-02-18T22:58:32+01:00
 * @Copyright: Technology Studio
**/

import type {
  StringSchema,
  ObjectSchema,
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
import { isObject } from '@txo/functional'
import type { ObjectShape } from 'yup/lib/object'
import type {
  LocaleObject,
} from 'yup/lib/locale'

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
  message = _localization.string?.equalsTo,
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
  message = _localization.string?.phoneNumber,
) {
  return this.test({
    name: 'phoneNumber',
    exclusive: false,
    message,
    test: function (value: unknown) {
      return value == null || parsePhoneNumber(value as string).isValid()
    },
  })
})

addMethod<StringSchema>(string, 'numeric', function (
  message = _localization.string?.numeric,
) {
  return this.matches(/[\d.,]+/, message)
})

addMethod<StringSchema>(string, 'numbersOnly', function (
  message = _localization.string?.numbersOnly,
) {
  return this.matches(/[\d]+/, message)
})

addMethod<ObjectSchema<ObjectShape>>(object, 'requiredRelation', function (
  idKey = 'id',
  message = _localization.mixed?.required,
) {
  return this.test({
    name: 'requiredRelation',
    exclusive: false,
    message,
    test: function (value: unknown): boolean {
      if (value && isObject(value)) {
        const _value = value as Record<string, string>
        return !!(typeof _value[idKey] === 'string' && _value[idKey])
      }
      return false
    },
  })
})

addMethod<ObjectSchema<ObjectShape>>(object, 'atLeastOneRequired', function (
  keys: string[],
  message = _localization.object?.atLeastOneRequired,
) {
  return this.test({
    name: 'atLeastOneRequired',
    exclusive: false,
    message,
    test: function (value: unknown): boolean | ValidationError {
      if (value && isObject(value)) {
        const isValid = keys.some((key) => (value as Record<string, string>)[key])
        return isValid || new ValidationError(message, value, 'atLeastOneRequired')
      }
      return false
    },
  },
  )
})
