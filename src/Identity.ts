import { Alt1 } from './Alt.ts'
import { Applicative } from './Applicative.ts'
import { ChainRec1 } from './ChainRec.ts'
import { Comonad1 } from './Comonad.ts'
import { Either } from './Either.ts'
import { Foldable1 } from './Foldable.ts'
import { identity as id } from './function.ts'
import { HKT } from './HKT.ts'
import { Monad1 } from './Monad.ts'
import { Eq } from './Eq.ts'
import { Show } from './Show.ts'
import { Traversable1 } from './Traversable.ts'

declare module './HKT' {
  interface URI2HKT<A> {
    Identity: Identity<A>
  }
}

/**
 * @since 2.0.0
 */
export const URI = 'Identity.ts'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @since 2.0.0
 */
export type Identity<A> = A

/**
 * @since 2.0.0
 */
export const getShow: <A>(S: Show<A>) => Show<Identity<A>> = id

/**
 * @since 2.0.0
 */
export const getEq: <A>(E: Eq<A>) => Eq<Identity<A>> = id

const chainRec = <A, B>(a: A, f: (a: A) => Either<A, B>): B => {
  let v = f(a)
  while (v._tag === 'Left') {
    v = f(v.left)
  }
  return v.right
}

const traverse = <F>(F: Applicative<F>) => <A, B>(ta: Identity<A>, f: (a: A) => HKT<F, B>): HKT<F, Identity<B>> => {
  return F.map(f(ta), id)
}

const sequence = <F>(F: Applicative<F>) => <A>(ta: Identity<HKT<F, A>>): HKT<F, Identity<A>> => {
  return F.map(ta, id)
}

/**
 * @since 2.0.0
 */
export const identity: Monad1<URI> & Foldable1<URI> & Traversable1<URI> & Alt1<URI> & Comonad1<URI> & ChainRec1<URI> = {
  URI,
  map: (ma, f) => f(ma),
  of: id,
  ap: (mab, ma) => mab(ma),
  chain: (ma, f) => f(ma),
  reduce: (fa, b, f) => f(b, fa),
  foldMap: _ => (fa, f) => f(fa),
  reduceRight: (fa, b, f) => f(fa, b),
  traverse,
  sequence,
  alt: id,
  extract: id,
  extend: (wa, f) => f(wa),
  chainRec
}
