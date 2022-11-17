import type {
  Ref,
  WatchCallback,
  WatchOptions,
  WatchSource,
  WatchStopHandle,
} from 'vue'
import { nextTick, ref, watch } from 'vue'
import { resolveUnref } from '../reactive'
import type { MapOldSources, MapSources, MaybeComputedRef } from '../types'

export interface WatchMostOptions<Immediate> extends WatchOptions<Immediate> {
  count: MaybeComputedRef<number>
}

export interface WatchMostReturn {
  stop: WatchStopHandle
  count: Ref<number>
}

/**
 * `watch` with the number of times triggered.
 * ```ts
 * const source = ref('foo')
 * watchMost(
 *   source,
 *   (v) => console.log(`source: ${v}`), // triggered it at most 3 times
 *   { count: 3 } // the number of times triggered
 * )
 * ```
 */
export function watchMost<
  T extends Readonly<WatchSource<unknown>[]>,
  Immediate extends Readonly<boolean> = false
>(
  source: [...T],
  cb: WatchCallback<MapSources<T>, MapOldSources<T, Immediate>>,
  options: WatchMostOptions<Immediate>
): WatchMostReturn
export function watchMost<T, Immediate extends Readonly<boolean> = false>(
  source: WatchSource<T>,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options: WatchMostOptions<Immediate>
): WatchMostReturn
export function watchMost<Immediate extends Readonly<boolean> = false>(
  source: any,
  cb: any,
  options: WatchMostOptions<Immediate>
): WatchMostReturn {
  const { count, ...watchOptions } = options

  const current = ref(0)

  const stop = watch(
    source,
    (...args) => {
      current.value += 1
      if (current.value >= resolveUnref(count)) {
        nextTick(() => stop())
      }
      cb(...args)
    },
    watchOptions
  )

  return {
    count: current,
    stop,
  }
}
