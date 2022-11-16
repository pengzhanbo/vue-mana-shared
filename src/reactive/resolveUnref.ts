import { unref } from 'vue'
import type { MaybeComputedRef } from '../types'

export function resolveUnref<T>(v: MaybeComputedRef<T>): T {
  return typeof v === 'function' ? (v as any)() : unref(v)
}
