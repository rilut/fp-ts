import { Applicative2C } from './Applicative.ts'
import { Apply2C } from './Apply.ts'
import { Contravariant2 } from './Contravariant.ts'
import { phantom, unsafeCoerce, identity } from './function.ts'
import { Functor2 } from './Functor.ts'
import { Monoid } from './Monoid.ts'
import { Semigroup } from './Semigroup.ts'
import { Eq } from './Eq.ts'
import { Show } from './Show.ts'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Const: Const<L, A>
  }
}

/**
 * @since 2.0.0
 */
export const URI = 'Const.ts'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @since 2.0.0
 */
export type Const<L, A> = L & { readonly _A: A }

/**
 * @since 2.0.0
 */
export const make: <L>(l: L) => Const<L, never> = unsafeCoerce

/**
 * @since 2.0.0
 */
export function getShow<L, A>(S: Show<L>): Show<Const<L, A>> {
  return {
    show: c => `make(${S.show(c)})`
  }
}

/**
 * @since 2.0.0
 */
export const getEq: <L, A>(E: Eq<L>) => Eq<Const<L, A>> = identity

const map = unsafeCoerce

/**
 * @since 2.0.0
 */
export function getApply<L>(S: Semigroup<L>): Apply2C<URI, L> {
  return {
    URI,
    _L: phantom,
    map,
    ap: (fab, fa) => make(S.concat(fab, fa))
  }
}

/**
 * @since 2.0.0
 */
export function getApplicative<L>(M: Monoid<L>): Applicative2C<URI, L> {
  return {
    ...getApply(M),
    of: () => make(M.empty)
  }
}

/**
 * @since 2.0.0
 */
export const const_: Functor2<URI> & Contravariant2<URI> = {
  URI,
  map,
  contramap: unsafeCoerce
}
