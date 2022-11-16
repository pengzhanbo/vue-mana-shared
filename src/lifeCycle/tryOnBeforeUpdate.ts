import { getCurrentInstance, onBeforeUpdate } from 'vue'
import type { Fn } from '../types'

/**
 * Call onBeforeUpdate() if it's inside a component lifecycle
 * @param fn
 */
export function tryOnBeforeUpdate(fn: Fn) {
  if (getCurrentInstance()) {
    onBeforeUpdate(fn)
  }
}
