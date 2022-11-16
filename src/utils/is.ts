export const isClient = typeof window !== 'undefined'

const toString = String.prototype.toString
const hasOwnProperty = Object.prototype.hasOwnProperty

export const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined'

export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'

export const isNumber = (val: any): val is number => typeof val === 'number'

export const isString = (val: any): val is string => typeof val === 'string'

export const isObject = (val: any): val is object =>
  toString.call(val) === '[object Object]'

export const isFunction = <T extends Function>(val: any): val is T =>
  typeof val === 'function'

export const isArray = Array.isArray

export const hasOwn = <T extends object, K extends keyof T>(
  obj: T,
  key: K
): key is K => hasOwnProperty.call(obj, key)
