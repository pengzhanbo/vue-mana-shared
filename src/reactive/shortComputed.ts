import { computed } from 'vue'
import type {
  ComputedGetter,
  DebuggerOptions,
  WritableComputedOptions,
} from 'vue'
import { isFunction } from '../utils'

/**
 * Shorthand for `computed.value`
 * ```ts
 * const bar = ref('bar')
 * const foo = shortComputed<string>(() => bar.value + ' foo')
 * foo() // 'bar foo'
 * ```
 */
export function shortComputed<T>(
  getter: ComputedGetter<T>,
  debuggerOptions?: DebuggerOptions
): () => T
/**
 * Shorthand for `computed.value`
 * ```ts
 * const bar = ref(1)
 * const foo = shortComputed<string>({
 *   get() {
 *     return bar.value + 1
 *   }
 *   set(val) {
 *     bar.value = val - 1
 *   }
 * })
 * foo() // 2
 * foo.set(3)
 * bar.value // 2
 * foo() // 3
 * ```
 */
export function shortComputed<T>(
  options: WritableComputedOptions<T>,
  debuggerOptions?: DebuggerOptions
): {
  (): T
  set(val: T): void
}
export function shortComputed<T>(
  getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>,
  debuggerOptions?: DebuggerOptions
) {
  const variable = computed(
    getterOrOptions as WritableComputedOptions<T>,
    debuggerOptions
  )

  const getter = () => variable.value

  if (!isFunction(getterOrOptions)) {
    getter.set = (val: T) => {
      variable.value = val
    }
  }

  return getter
}
