import type { ToRefs } from 'vue'
import { toRefs as _toRefs, customRef, isRef } from 'vue'
import type { MaybeRef } from '../types'
import { isArray } from '../utils'

/**
 * Extended `toRefs` that also accepts refs of an object.
 *
 * @param objectRef A ref or normal object or array.
 */
export function toRefs<T extends object>(objectRef: MaybeRef<T>): ToRefs<T> {
  if (!isRef(objectRef)) {
    return _toRefs(objectRef)
  }

  const result: any = isArray(objectRef.value)
    ? new Array(objectRef.value.length)
    : {}

  for (const key in objectRef.value) {
    result[key] = customRef<T[typeof key]>(() => ({
      get() {
        return objectRef.value[key]
      },
      set(v) {
        if (isArray(objectRef.value)) {
          const copy: any = [...objectRef.value]
          copy[key] = v
          objectRef.value = copy
        } else {
          const copy = { ...objectRef.value, [key]: v }
          Object.setPrototypeOf(copy, objectRef.value)
          objectRef.value = copy
        }
      },
    }))
  }
  return result as ToRefs<T>
}
