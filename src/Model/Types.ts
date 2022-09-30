/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2020-10-04T15:10:83+02:00
 * @Copyright: Technology Studio
 **/

/* eslint-disable @typescript-eslint/ban-types */

import type { TestOptionsMessage } from 'yup'

declare module 'yup' {
  interface ObjectSchema<T extends object | null | undefined = object | undefined, C = object> extends Schema<T, C> {
    requiredRelation: (idKey?: string) => ObjectSchema<T>,
    atLeastOneRequired: (keys: string[]) => ObjectSchema<T>,
  }

  interface StringSchema<T extends string | null | undefined = string | undefined, C = object> extends Schema<T, C> {
    numbersOnly: () => StringSchema<T, C>,
    phoneNumber: () => StringSchema<T, C>,
    equalsTo: () => StringSchema<T, C>,
  }

  interface StringLocale {
    decimal?: TestOptionsMessage,
    numbersOnly?: TestOptionsMessage,
    numeric?: TestOptionsMessage,
    phoneNumber?: TestOptionsMessage,
    equalsTo?: TestOptionsMessage,
  }

  interface DateLocale {
    required?: TestOptionsMessage,
  }

  interface ObjectLocale {
    atLeastOneRequired?: TestOptionsMessage,
  }
}
