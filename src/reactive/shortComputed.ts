import { computed } from 'vue'
import type {
  ComputedGetter,
  DebuggerOptions,
  WritableComputedOptions,
} from 'vue'
import { isFunction } from '../utils'

export function shortComputed<T>(
  getter: ComputedGetter<T>,
  debuggerOptions?: DebuggerOptions
): () => T
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
