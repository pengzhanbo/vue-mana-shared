import type { WatchCallback, WatchOptions, WatchSource } from 'vue'
import { nextTick, watch } from 'vue'
import type { MapOldSources, MapSources } from '../types'

/**
 * `watch` that only triggers once.
 * ```ts
 * watchOnce(source, (v) => {
 *   // triggers only once
 *   console.log(v)
 * })
 * ```
 */
export function watchOnce<
  T extends Readonly<WatchSource<unknown>[]>,
  Immediate extends Readonly<boolean> = false
>(
  source: [...T],
  cb: WatchCallback<MapSources<T>, MapOldSources<T, Immediate>>,
  options?: WatchOptions<Immediate>
): void
export function watchOnce<T, Immediate extends Readonly<boolean> = false>(
  source: WatchSource<T>,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchOptions<Immediate>
): void
export function watchOnce<Immediate extends Readonly<boolean> = false>(
  source: any,
  cb: any,
  options?: WatchOptions<Immediate>
): void {
  const stop = watch(
    source,
    (...args) => {
      nextTick(() => stop())

      return cb(...args)
    },
    options
  )
}
