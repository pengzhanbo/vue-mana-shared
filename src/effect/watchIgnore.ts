import type { WatchCallback, WatchOptions, WatchSource } from 'vue'
import { ref, watch } from 'vue'
import type { Fn, MapOldSources, MapSources } from '../types'

export type IgnoreUpdater = (updater: () => void) => void

export interface WatchIgnoreReturn {
  ignoreUpdater: IgnoreUpdater
  ignorePrevASyncUpdater: () => void
  stop: () => void
}

/**
 * Extended `watch` that exposes a ignoreUpdater(updater) function that
 * allows to update the source without triggering effects
 * ```ts
 * const count = ref(0)
 * const { ignoreUpdater } = watchIgnore(count, (v) => console.log(`count: ${v}`))
 * count.value++
 * await nextTick() // count: 1
 * ignoreUpdater(() => {
 *   count.value++
 * })
 * await nextTick() // nothing happened
 * ```
 */
export function watchIgnore<
  T extends Readonly<WatchSource<unknown>[]>,
  Immediate extends Readonly<boolean> = false
>(
  source: [...T],
  cb: WatchCallback<MapSources<T>, MapOldSources<T, Immediate>>,
  options?: WatchOptions<Immediate>
): WatchIgnoreReturn
export function watchIgnore<T, Immediate extends Readonly<boolean> = false>(
  source: WatchSource<T>,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchOptions<Immediate>
): WatchIgnoreReturn
export function watchIgnore<Immediate extends Readonly<boolean> = false>(
  source: any,
  cb: any,
  options: WatchOptions<Immediate> = {}
): WatchIgnoreReturn {
  let ignoreUpdater: IgnoreUpdater
  let stop: () => void
  let ignorePrevASyncUpdater: () => void

  if (options.flush === 'sync') {
    const ignore = ref(false)
    ignoreUpdater = (updater) => {
      ignore.value = true
      updater()
      ignore.value = false
    }
    ignorePrevASyncUpdater = () => {}
    stop = watch(
      source,
      (...args) => {
        if (!ignore.value) {
          cb(...args)
        }
      },
      options
    )
  } else {
    // flush 'pre' or 'post'
    const disposables: Fn[] = []
    const ignoreCounter = ref(0)
    const syncCounter = ref(0)

    ignoreUpdater = (updater) => {
      const prev = syncCounter.value
      updater()
      ignoreCounter.value += syncCounter.value - prev
    }

    ignorePrevASyncUpdater = () => {
      ignoreCounter.value = syncCounter.value
    }

    stop = () => disposables.forEach((fn) => fn())

    disposables.push(
      watch(
        source,
        () => {
          syncCounter.value += 1
        },
        { ...options, flush: 'sync' }
      ),
      watch(
        source,
        (...args) => {
          const ignore =
            ignoreCounter.value > 0 && ignoreCounter.value === syncCounter.value
          ignoreCounter.value = 0
          syncCounter.value = 0
          if (ignore) {
            cb(...args)
          }
        },
        options
      )
    )
  }

  return {
    ignoreUpdater,
    ignorePrevASyncUpdater,
    stop,
  }
}
