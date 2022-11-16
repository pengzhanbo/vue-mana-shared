import { getCurrentInstance, onUpdated } from 'vue'
import type { Fn } from '../types'

/**
 * Call onUpdated() if it's inside a component lifecycle
 * @param fn
 */
export function tryOnUpdated(fn: Fn): void {
  if (getCurrentInstance()) {
    onUpdated(fn)
  }
}
