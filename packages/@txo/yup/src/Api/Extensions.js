/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2019-02-18T22:58:32+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import {
  addMethod,
  string,
  object,
  ref,
  setLocale as _setLocale,
} from 'yup'
import AwesomePhoneNumber from 'awesome-phonenumber'
import { Log } from '@txo/log'
import { isObject } from '@txo/functional'

const log = new Log('App.Modules.Yup.Api.Extensions')

export const yupParam = (key: string, placeholder?: string) => ({
  [key]: `\${${placeholder || key}}`,
})

var _localization = {}

export const setLocale = (localization: Object) => {
  _localization = localization
  _setLocale(localization)
}

type Message = string | () => string

addMethod(string, 'equalsTo', function (
  key: string,
  message?: Message = _localization.string?.equalsTo,
) {
  log.debug('equalsTo', { key, message })
  return this.test({
    name: 'equalsTo',
    exclusive: false,
    message,
    test: function (value: any) {
      return value === this.resolve(ref(key))
    },
  })
})

addMethod(string, 'phoneNumber', function (
  ref: any,
  message?: Message = _localization.string?.phoneNumber,
) {
  return this.test({
    name: 'phoneNumber',
    exclusive: false,
    message,
    test: function (value: any) {
      return value == null || new AwesomePhoneNumber(value).isValid()
    },
  })
})

addMethod(string, 'numeric', function (
  message?: Message = _localization.string?.numeric,
) {
  return this.matches(/[\d.,]+/, message)
})

addMethod(string, 'numbersOnly', function (
  message?: Message = _localization.string?.numbersOnly,
) {
  return this.matches(/[\d]+/, message)
})

addMethod(object, 'requiredRelation', function (
  idKey?: string = 'id',
  message?: Message = _localization.mixed?.required,
) {
  return this.test({
    name: 'requiredRelation',
    exclusive: false,
    message,
    test: function (value: any) {
      return isObject(value) && typeof value[idKey] === 'string' && value[idKey]
    },
  })
})
