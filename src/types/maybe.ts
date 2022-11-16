import type { ComponentPublicInstance, ComputedRef, Ref } from 'vue'

/**
 * maybe it's a ref, or a plain value
 *
 * ```ts
 * type MaybeRef<T> = T | Ref<T>
 * ```
 */
export type MaybeRef<T> = T | Ref<T>

/**
 * maybe it's a computed ref, or a getter function
 *
 * ```ts
 * type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>
 * ```
 */
export type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>

/**
 * maybe it's a ref, a plain value, or a getter function
 *
 * ```
 * MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>
 * ```
 */
export type MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>

export type VueInstance = ComponentPublicInstance

/**
 * maybe it's a html element, svg element, vue Instance, null or undefined
 */
export type MaybeElement =
  | HTMLElement
  | SVGElement
  | VueInstance
  | null
  | undefined

/**
 * maybe it's a element ref, a plain element, null or undefined
 */
export type MaybeElementRef<T extends MaybeElement = MaybeElement> =
  | T
  | MaybeRef<T>

/**
 * maybe it's a computed element ref, a plain element, null or undefined
 */
export type MaybeComputedElementRef<T extends MaybeElement = MaybeElement> =
  | T
  | MaybeComputedRef<T>
