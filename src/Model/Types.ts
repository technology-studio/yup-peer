/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2020-10-04T15:10:83+02:00
 * @Copyright: Technology Studio
 **/

import type {
  Schema,
  AnyObject,
  Maybe,
  Message,
  Flags,
  MakePartial,
  setLocale,
} from 'yup'

// NOTE: imported from yup/util/types.ts
// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/naming-convention -- this seems to force TS to show the full type instead of all the wrapped generics
type _<T> = T extends {} ? { [k in keyof T]: T[k] } : T

// NOTE: imported from yup/object.ts
type MakeKeysOptional<T> = T extends AnyObject ? _<MakePartial<T>> : T

declare module 'yup' {
  interface ObjectSchema<
    TIn extends Maybe<AnyObject>,
    TContext = AnyObject,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- `yup/object.ts` uses this: "important that this is `any` so that using `ObjectSchema<MyType>`'s default will match object schema regardless of defaults"
    TDefault = any,
    TFlags extends Flags = '',
  > extends Schema<MakeKeysOptional<TIn>, TContext, TDefault, TFlags> {
    requiredRelation: (idKey?: string) => this,
    atLeastOneRequired: (keys: string[]) => this,
  }

  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext = AnyObject,
    TDefault = undefined,
    TFlags extends Flags = '',
  > extends Schema<TType, TContext, TDefault, TFlags> {
    decimal: () => StringSchema<TType>,
    numbersOnly: () => StringSchema<TType>,
    numeric: () => StringSchema<TType>,
    phoneNumber: () => StringSchema<TType>,
    equalsTo: () => StringSchema<TType>,
  }

  interface StringLocale {
    decimal?: Message,
    numbersOnly?: Message,
    numeric?: Message,
    phoneNumber?: Message,
    equalsTo?: Message,
  }

  interface DateLocale {
    required?: Message,
  }

  interface ObjectLocale {
    atLeastOneRequired?: Message,
  }
}

// eslint-disable-next-line @typescript-eslint/no-magic-numbers -- get first type from tuple - custom locale object
export type YupLocaleObject = Parameters<typeof setLocale>[0]

export type StringLocale = YupLocaleObject['string'] & {
  decimal?: Message,
  numbersOnly?: Message,
  numeric?: Message,
  phoneNumber?: Message,
  equalsTo?: Message,
}

export type DateLocale = YupLocaleObject['date'] & {
  required?: Message,
}

export type ObjectLocale = YupLocaleObject['object'] & {
  atLeastOneRequired?: Message,
}

export type LocaleObject = YupLocaleObject & {
  date?: DateLocale,
  string?: StringLocale,
  object?: ObjectLocale,
}
