/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
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
} from 'yup'

// NOTE: imported from yup/util/types.ts
/* this seems to force TS to show the full type instead of all the wrapped generics */
// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/naming-convention
type _<T> = T extends {} ? { [k in keyof T]: T[k] } : T

// NOTE: imported from yup/object.ts
type MakeKeysOptional<T> = T extends AnyObject ? _<MakePartial<T>> : T

declare module 'yup' {
  interface ObjectSchema<
    TIn extends Maybe<AnyObject>,
    TContext = AnyObject,
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
    numbersOnly: () => StringSchema<TType>,
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
