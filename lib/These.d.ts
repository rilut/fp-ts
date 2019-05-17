import { Bifunctor2 } from './Bifunctor';
import { Either, Left, Right } from './Either';
import { Foldable2 } from './Foldable';
import { Functor2 } from './Functor';
import { Monad2C } from './Monad';
import { Option } from './Option';
import { Semigroup } from './Semigroup';
import { Eq } from './Eq';
import { Show } from './Show';
import { Traversable2 } from './Traversable';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        These: These<L, A>;
    }
}
/**
 * @since 2.0.0
 */
export declare const URI = "These";
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI;
/**
 * @since 2.0.0
 */
export interface Both<L, A> {
    readonly _tag: 'Both';
    readonly left: L;
    readonly right: A;
}
/**
 * @since 2.0.0
 */
export declare type These<L, A> = Either<L, A> | Both<L, A>;
/**
 * @since 2.0.0
 */
export declare function left<L>(left: L): These<L, never>;
/**
 * @since 2.0.0
 */
export declare function right<A>(right: A): These<never, A>;
/**
 * @since 2.0.0
 */
export declare function both<L, A>(left: L, right: A): These<L, A>;
/**
 * @since 2.0.0
 */
export declare function fold<L, A, R>(onLeft: (l: L) => R, onRight: (a: A) => R, onBoth: (l: L, a: A) => R): (fa: These<L, A>) => R;
/**
 * @since 2.0.0
 */
export declare function getShow<L, A>(SL: Show<L>, SA: Show<A>): Show<These<L, A>>;
/**
 * @since 2.0.0
 */
export declare function getEq<L, A>(SL: Eq<L>, SA: Eq<A>): Eq<These<L, A>>;
/**
 * @since 2.0.0
 */
export declare function getSemigroup<L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<These<L, A>>;
/**
 * @since 2.0.0
 */
export declare function getMonad<L>(S: Semigroup<L>): Monad2C<URI, L>;
/**
 *
 * @example
 * import { toTuple, left, right, both } from 'fp-ts/lib/These'
 *
 * assert.deepStrictEqual(toTuple('a', 1)(left('b')), ['b', 1])
 * assert.deepStrictEqual(toTuple('a', 1)(right(2)), ['a', 2])
 * assert.deepStrictEqual(toTuple('a', 1)(both('b', 2)), ['b', 2])
 *
 * @since 2.0.0
 */
export declare function toTuple<L, A>(l: L, a: A): (fa: These<L, A>) => [L, A];
/**
 * Returns an `L` value if possible
 *
 * @example
 * import { getLeft, left, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(getLeft(left('a')), some('a'))
 * assert.deepStrictEqual(getLeft(right(1)), none)
 * assert.deepStrictEqual(getLeft(both('a', 1)), some('a'))
 *
 * @since 2.0.0
 */
export declare function getLeft<L, A>(fa: These<L, A>): Option<L>;
/**
 * Returns an `A` value if possible
 *
 * @example
 * import { getRight, left, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(getRight(left('a')), none)
 * assert.deepStrictEqual(getRight(right(1)), some(1))
 * assert.deepStrictEqual(getRight(both('a', 1)), some(1))
 *
 * @since 2.0.0
 */
export declare function getRight<L, A>(fa: These<L, A>): Option<A>;
/**
 * Returns `true` if the these is an instance of `Left`, `false` otherwise
 *
 * @since 2.0.0
 */
export declare function isLeft<L, A>(fa: These<L, A>): fa is Left<L>;
/**
 * Returns `true` if the these is an instance of `Right`, `false` otherwise
 *
 * @since 2.0.0
 */
export declare function isRight<L, A>(fa: These<L, A>): fa is Right<A>;
/**
 * Returns `true` if the these is an instance of `Both`, `false` otherwise
 *
 * @since 2.0.0
 */
export declare function isBoth<L, A>(fa: These<L, A>): fa is Both<L, A>;
/**
 * @example
 * import { leftOrBoth, left, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(leftOrBoth('a', none), left('a'))
 * assert.deepStrictEqual(leftOrBoth('a', some(1)), both('a', 1))
 *
 * @since 2.0.0
 */
export declare function leftOrBoth<L, A>(defaultLeft: L, ma: Option<A>): These<L, A>;
/**
 * @example
 * import { rightOrBoth, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(rightOrBoth(1, none), right(1))
 * assert.deepStrictEqual(rightOrBoth(1, some('a')), both('a', 1))
 *
 * @since 2.0.0
 */
export declare function rightOrBoth<L, A>(defaultRight: A, ml: Option<L>): These<L, A>;
/**
 * Returns the `L` value if and only if the value is constructed with `Left`
 *
 * @example
 * import { getLeftOnly, left, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(getLeftOnly(left('a')), some('a'))
 * assert.deepStrictEqual(getLeftOnly(right(1)), none)
 * assert.deepStrictEqual(getLeftOnly(both('a', 1)), none)
 *
 * @since 2.0.0
 */
export declare function getLeftOnly<L, A>(fa: These<L, A>): Option<L>;
/**
 * Returns the `A` value if and only if the value is constructed with `Right`
 *
 * @example
 * import { getRightOnly, left, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(getRightOnly(left('a')), none)
 * assert.deepStrictEqual(getRightOnly(right(1)), some(1))
 * assert.deepStrictEqual(getRightOnly(both('a', 1)), none)
 *
 *
 * @since 2.0.0
 */
export declare function getRightOnly<L, A>(fa: These<L, A>): Option<A>;
/**
 * Takes a pair of `Option`s and attempts to create a `These` from them
 *
 * @example
 * import { fromOptions, left, right, both } from 'fp-ts/lib/These'
 * import { none, some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(fromOptions(none, none), none)
 * assert.deepStrictEqual(fromOptions(some('a'), none), some(left('a')))
 * assert.deepStrictEqual(fromOptions(none, some(1)), some(right(1)))
 * assert.deepStrictEqual(fromOptions(some('a'), some(1)), some(both('a', 1)))
 *
 * @since 2.0.0
 */
export declare function fromOptions<L, A>(fl: Option<L>, fa: Option<A>): Option<These<L, A>>;
/**
 * @since 2.0.0
 */
export declare const these: Functor2<URI> & Bifunctor2<URI> & Foldable2<URI> & Traversable2<URI>;
