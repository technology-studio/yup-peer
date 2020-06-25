// TODO: schema is hardcoded to give at least some types, but must be generalized

declare module 'yup' {
  declare type ValidateOptions = {
    strict?: boolean,
    abortEarly?: boolean,
    stripUnknown?: boolean,
    recursive?: boolean,
    context?: any
  };

  declare type ValidationError = {
    errors: string | string[],
    value: any,
    path: string,
    type?: any
  };

  declare type SchemaDescription = {
    type: string,
    label: string,
    meta: string,
    tests: string[]
  };

  declare type WhenOptionsBuilder<T> = {
    (value: any, schema: T): T,
    (v1: any, v2: any, schema: T): T,
    (v1: any, v2: any, v3: any, schema: T): T,
    (v1: any, v2: any, v3: any, v4: any, schema: T): T
  };

  declare type WhenOptions<T> =
    | WhenOptionsBuilder<T>
    | {
        is: boolean | ((value: any) => boolean),
        then: any,
        otherwise: any
      };

  declare type TestOptions = {
    name?: string,
    test: (value: any) => boolean,
    message?: string,
    params?: any,
    exclusive?: boolean
  };

  declare type TransformFunction<T> = (
    schema: T,
    value: any,
    originalValue: any
  ) => any;

  declare type Message = string | () => string

  declare type Schema = {
    shape(fields: any, noSortEdges?: Array<[string, string]>): Schema,
    clone(): Schema,
    label(label: string): Schema,
    meta(metadata: any): Schema,
    meta(): any,
    describe(): SchemaDescription,
    concat(schema: Schema): Schema,
    validate<U>(
      value: U,
      options?: ValidateOptions
    ): Promise<ValidationError | U>,
    validateSync<U>(value: U, options?: ValidateOptions): ValidationError | U,
    isValid(value: any, options?: any): Promise<boolean>,
    isValidSync(value: any, options?: any): boolean,
    cast(value: any, options?: any): any,
    isType(value: any): boolean,
    strict(isStrict: boolean): Schema,
    strip(strip: boolean): Schema,
    withMutation(fn: (current: Schema) => void): void,
    default(value?: any): Schema,
    nullable(isNullable?: boolean): Schema,
    required(message?: string): Schema,
    email(message?: string): Schema,
    typeError(message?: string): Schema,
    oneOf(arrayOfValues: any[], message?: string): Schema,
    notOneOf(arrayOfValues: any[], message?: string): Schema,
    when(keys: string | any[], builder: WhenOptions<Schema>): Schema,
    test(
      name: string,
      message: string,
      test: (value?: any) => boolean,
      callbackStyleAsync?: boolean
    ): Schema,
    test(options: TestOptions): Schema,
    transform(fn: TransformFunction<Schema>): Schema,
    trim(message?: Message): Schema,
    // string
    min(limit: number, message?: Message): Schema,
    max(limit: number, message?: Message): Schema,
    length(limit: number, message?: Message): Schema,

    // project extensions
    numbersOnly(message?: Message): Schema,
    equalsTo(key: string, message?: Message): Schema,
  };

  declare type Yup = {
    object(): Schema,
    string(): Schema,
    date(): Schema,
    mixed(): Schema,
    number(): Schema,
    boolean(): Schema,
    array(): Schema,
    object(): Schema,
    addMethod(schema: any, name: string, method: ((...args: any[]) => any)): void,
    setLocale(map: Object): void,
    ref(reference: any): any,
    locale: Object,
  };

  declare module.exports: Yup;
}
