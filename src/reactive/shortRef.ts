import { ref } from 'vue'
import type { MaybeRef } from '../types'
import { resolveUnref } from './resolveUnref'

/**
 * Shorthand for `ref.value`
 * ```ts
 * const foo = shortRef('foo')
 * foo() // 'foo'
 * foo.set('bar')
 * foo() // 'bar'
 * ```
 */
export function shortRef<T extends object>(val: MaybeRef<T>) {
  const plain = resolveUnref(val)
  const plainRef = ref(plain)
  const getter = (): T => plainRef.value

  function setter(val: T): void
  function setter<K extends keyof T>(key: K, val?: T[K]): void {
    if (arguments.length === 1) {
      plainRef.value = key
    } else {
      plainRef.value[key] = val
    }
  }
  getter.set = setter
  return getter
}
