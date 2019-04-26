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
export declare const URI = "Tuple";
export declare type URI = typeof URI;
/**
 * @since 2.0.0
 */
export declare type Tuple<L, A> = [L, A];
/**
 * @since 2.0.0
 */
export declare const getShow: <L, A>(SL: Show<L>, SA: Show<A>) => Show<[L, A]>;
/**
 * @since 2.0.0
 */
export declare const fst: <L, A>(fa: [L, A]) => L;
/**
 * @since 2.0.0
 */
export declare const snd: <L, A>(fa: [L, A]) => A;
/**
 * @since 2.0.0
 */
export declare const swap: <L, A>(fa: [L, A]) => [A, L];
/**
 * @since 2.0.0
 */
export declare const getEq: <L, A>(SA: Eq<L>, SB: Eq<A>) => Eq<[L, A]>;
/**
 * To obtain the result, the `fst`s are `compare`d, and if they are `EQ`ual, the
 * `snd`s are `compare`d.
 *
 * @since 2.0.0
 */
export declare const getOrd: <L, A>(OL: Ord<L>, OA: Ord<A>) => Ord<[L, A]>;
/**
 * @since 2.0.0
 */
export declare const getSemigroup: <L, A>(SL: Semigroup<L>, SA: Semigroup<A>) => Semigroup<[L, A]>;
/**
 * @since 2.0.0
 */
export declare const getMonoid: <L, A>(ML: Monoid<L>, MA: Monoid<A>) => Monoid<[L, A]>;
/**
 * @since 2.0.0
 */
export declare const getApply: <L>(S: Semigroup<L>) => Apply2C<"Tuple", L>;
/**
 * @since 2.0.0
 */
export declare const getApplicative: <L>(M: Monoid<L>) => Applicative2C<"Tuple", L>;
/**
 * @since 2.0.0
 */
export declare const getChain: <L>(S: Semigroup<L>) => Chain2C<"Tuple", L>;
/**
 * @since 2.0.0
 */
export declare const getMonad: <L>(M: Monoid<L>) => Monad2C<"Tuple", L>;
/**
 * @since 2.0.0
 */
export declare const getChainRec: <L>(M: Monoid<L>) => ChainRec2C<"Tuple", L>;
/**
 * @since 2.0.0
 */
export declare const tuple: Semigroupoid2<URI> & Bifunctor2<URI> & Comonad2<URI> & Foldable2<URI> & Traversable2<URI>;
