/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2020-10-04T15:10:83+02:00
 * @Copyright: Technology Studio
 **/

import type {
  BaseSchema,
} from 'yup'
import type {
  AssertsShape,
  ObjectShape,
  TypeOfShape,
} from 'yup/lib/object'
import type {
  AnyObject,
  Maybe,
  Message,
  Optionals,
} from 'yup/lib/types'

declare module 'yup' {
  interface ObjectSchema<TShape extends ObjectShape, TContext extends AnyObject = AnyObject, TIn extends Maybe<TypeOfShape<TShape>> = TypeOfShape<TShape>, TOut extends Maybe<AssertsShape<TShape>> = AssertsShape<TShape> | Optionals<TIn>> extends BaseSchema<TIn, TContext, TOut> {
    requiredRelation: (idKey?: string) => this,
    atLeastOneRequired: (keys: string[]) => this,
  }

  interface StringSchema<TType extends Maybe<string> = string | undefined, TContext extends AnyObject = AnyObject, TOut extends TType = TType> extends BaseSchema<TType, TContext, TOut> {
    numbersOnly: () => StringSchema<TType>,
    phoneNumber: () => StringSchema<TType>,
    equalsTo: () => StringSchema<TType>,
  }
}

declare module 'yup/lib/locale' {
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
