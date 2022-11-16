import type { ComputedRef, Ref } from 'vue'
import { computed, ref } from 'vue'
import type { MaybeComputedRef, MaybeRef } from '../types'

export function resolveRef<T>(v: MaybeComputedRef<T>): ComputedRef<T>
export function resolveRef<T>(v: MaybeRef<T>): Ref<T>
export function resolveRef<T>(v: T): Ref<T>
export function resolveRef<T>(v: MaybeComputedRef<T>) {
  return typeof v === 'function' ? computed<T>(v as any) : ref(v)
}
