import { getContM } from './ContT.ts'
import { identity } from './Identity.ts'
import { Monad2 } from './Monad.ts'

const T = getContM(identity)

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Cont: Cont<L, A>
  }
}

/**
 * @since 2.0.0
 */
export const URI = 'Cont.ts'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @since 2.0.0
 */
export interface Cont<R, A> {
  (c: (a: A) => R): R
}

/**
 * @since 2.0.0
 */
export const cont: Monad2<URI> = {
  URI,
  map: T.map,
  of: T.of,
  ap: T.ap,
  chain: T.chain
}
