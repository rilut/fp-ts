/**
 * @file Adapted from https://github.com/purescript/purescript-tuples
 */
import { Applicative2C } from './Applicative';
import { Apply2C } from './Apply';
import { Bifunctor2 } from './Bifunctor';
import { Chain2C } from './Chain';
import { ChainRec2C } from './ChainRec';
import { Comonad2 } from './Comonad';
import { Foldable2 } from './Foldable';
import { Monad2C } from './Monad';
import { Monoid } from './Monoid';
import { Ord } from './Ord';
import { Semigroup } from './Semigroup';
import { Semigroupoid2 } from './Semigroupoid';
import { Eq } from './Eq';
import { Show } from './Show';
import { Traversable2 } from './Traversable';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        Tuple: Tuple<L, A>;
    }
}
/**
 * @since 2.0.0
 */
export declare const URI = "Tuple";
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI;
/**
 * @since 2.0.0
 */
export declare type Tuple<L, A> = [L, A];
/**
 * @since 2.0.0
 */
export declare function getShow<L, A>(SL: Show<L>, SA: Show<A>): Show<Tuple<L, A>>;
/**
 * @since 2.0.0
 */
export declare function fst<L, A>(fa: Tuple<L, A>): L;
/**
 * @since 2.0.0
 */
export declare function snd<L, A>(fa: Tuple<L, A>): A;
/**
 * @since 2.0.0
 */
export declare function swap<L, A>(fa: Tuple<L, A>): Tuple<A, L>;
/**
 * @since 2.0.0
 */
export declare function getEq<L, A>(EL: Eq<L>, EA: Eq<A>): Eq<Tuple<L, A>>;
/**
 * To obtain the result, the `fst`s are `compare`d, and if they are `EQ`ual, the
 * `snd`s are `compare`d.
 *
 * @since 2.0.0
 */
export declare function getOrd<L, A>(OL: Ord<L>, OA: Ord<A>): Ord<Tuple<L, A>>;
/**
 * @since 2.0.0
 */
export declare function getSemigroup<L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Tuple<L, A>>;
/**
 * @since 2.0.0
 */
export declare function getMonoid<L, A>(ML: Monoid<L>, MA: Monoid<A>): Monoid<Tuple<L, A>>;
/**
 * @since 2.0.0
 */
export declare function getApply<L>(S: Semigroup<L>): Apply2C<URI, L>;
/**
 * @since 2.0.0
 */
export declare function getApplicative<L>(M: Monoid<L>): Applicative2C<URI, L>;
/**
 * @since 2.0.0
 */
export declare function getChain<L>(S: Semigroup<L>): Chain2C<URI, L>;
/**
 * @since 2.0.0
 */
export declare function getMonad<L>(M: Monoid<L>): Monad2C<URI, L>;
/**
 * @since 2.0.0
 */
export declare function getChainRec<L>(M: Monoid<L>): ChainRec2C<URI, L>;
/**
 * @since 2.0.0
 */
export declare const tuple: Semigroupoid2<URI> & Bifunctor2<URI> & Comonad2<URI> & Foldable2<URI> & Traversable2<URI>;
