/**
 * @file Represents a value of one of two possible types (a disjoint union).
 *
 * An instance of `Either` is either an instance of `Left` or `Right`.
 *
 * A common use of `Either` is as an alternative to `Option` for dealing with possible missing values. In this usage,
 * `None` is replaced with a `Left` which can contain useful information. `Right` takes the place of `Some`. Convention
 * dictates that `Left` is used for failure and `Right` is used for success.
 *
 * For example, you could use `Either<string, number>` to detect whether a received input is a `string` or a `number`.
 *
 * ```ts
 * const parse = (errorMessage: string) => (input: string): Either<string, number> => {
 *   const n = parseInt(input, 10)
 *   return isNaN(n) ? left(errorMessage) : right(n)
 * }
 * ```
 *
 * `Either` is right-biased, which means that `Right` is assumed to be the default case to operate on. If it is `Left`,
 * operations like `map`, `chain`, ... return the `Left` value unchanged:
 *
 * ```ts
 * import { either } from 'fp-ts/lib/Either'
 *
 * either.map(right(12), double) // right(24)
 * either.map(left(23), double)  // left(23)
 * ```
 */
import { Alt2 } from './Alt';
import { Bifunctor2 } from './Bifunctor';
import { ChainRec2 } from './ChainRec';
import { Compactable2C } from './Compactable';
import { Extend2 } from './Extend';
import { Filterable2C } from './Filterable';
import { Foldable2 } from './Foldable';
import { Lazy, Predicate, Refinement } from './function';
import { Monad2 } from './Monad';
import { MonadThrow2 } from './MonadThrow';
import { Monoid } from './Monoid';
import { Semigroup } from './Semigroup';
import { Eq } from './Eq';
import { Show } from './Show';
import { Traversable2 } from './Traversable';
import { Witherable2C } from './Witherable';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        Either: Either<L, A>;
    }
}
export declare const URI = "Either";
export declare type URI = typeof URI;
export interface Left<L> {
    readonly _tag: 'Left';
    readonly left: L;
}
export interface Right<A> {
    readonly _tag: 'Right';
    readonly right: A;
}
/**
 * @since 2.0.0
 */
export declare type Either<L, A> = Left<L> | Right<A>;
/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure
 *
 * @since 2.0.0
 */
export declare function left<L>(l: L): Either<L, never>;
/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure
 *
 * @since 2.0.0
 */
export declare function right<A>(a: A): Either<never, A>;
/**
 * @since 2.0.0
 */
export declare function fold<L, A, R>(ma: Either<L, A>, onLeft: (l: L) => R, onRight: (a: A) => R): R;
/**
 * @since 2.0.0
 */
export declare function getShow<L, A>(SL: Show<L>, SA: Show<A>): Show<Either<L, A>>;
/**
 * @since 2.0.0
 */
export declare function getEq<L, A>(SL: Eq<L>, SA: Eq<A>): Eq<Either<L, A>>;
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * @example
 * import { getSemigroup, left, right } from 'fp-ts/lib/Either'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getSemigroup<string, number>(semigroupSum)
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), right(2))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), right(1))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 *
 * @since 2.0.0
 */
export declare function getSemigroup<L, A>(S: Semigroup<A>): Semigroup<Either<L, A>>;
/**
 * `Apply` semigroup
 *
 * @example
 * import { getApplySemigroup, left, right } from 'fp-ts/lib/Either'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getApplySemigroup<string, number>(semigroupSum)
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), left('a'))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), left('b'))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 *
 * @since 2.0.0
 */
export declare function getApplySemigroup<L, A>(S: Semigroup<A>): Semigroup<Either<L, A>>;
/**
 * @since 2.0.0
 */
export declare function getApplyMonoid<L, A>(M: Monoid<A>): Monoid<Either<L, A>>;
/**
 * @since 2.0.0
 */
export declare function fromPredicate<L, A, B extends A>(predicate: Refinement<A, B>, onFalse: (a: A) => L): (a: A) => Either<L, B>;
export declare function fromPredicate<L, A>(predicate: Predicate<A>, onFalse: (a: A) => L): (a: A) => Either<L, A>;
/**
 * Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`
 *
 * @since 2.0.0
 */
export declare function fromNullable<L, A>(a: A | null | undefined, l: L): Either<L, A>;
/**
 * Default value for the `onError` argument of `tryCatch`
 *
 * @since 2.0.0
 */
export declare function toError(e: unknown): Error;
/**
 * Constructs a new `Either` from a function that might throw
 *
 * @example
 * import { Either, left, right, tryCatch } from 'fp-ts/lib/Either'
 *
 * const unsafeHead = <A>(as: Array<A>): A => {
 *   if (as.length > 0) {
 *     return as[0]
 *   } else {
 *     throw new Error('empty array')
 *   }
 * }
 *
 * const head = <A>(as: Array<A>): Either<Error, A> => {
 *   return tryCatch(() => unsafeHead(as), e => (e instanceof Error ? e : new Error('unknown error')))
 * }
 *
 * assert.deepStrictEqual(head([]), left(new Error('empty array')))
 * assert.deepStrictEqual(head([1, 2, 3]), right(1))
 *
 * @since 2.0.0
 */
export declare function tryCatch<L, A>(f: Lazy<A>, onError: (e: unknown) => L): Either<L, A>;
/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise
 *
 * @since 2.0.0
 */
export declare function isLeft<L, A>(ma: Either<L, A>): ma is Left<L>;
/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise
 *
 * @since 2.0.0
 */
export declare function isRight<L, A>(ma: Either<L, A>): ma is Right<A>;
/**
 * @since 2.0.0
 */
export declare function mapLeft<L, A, M>(ma: Either<L, A>, f: (l: L) => M): Either<M, A>;
/**
 * @since 2.0.0
 */
export declare function swap<L, A>(ma: Either<L, A>): Either<A, L>;
/**
 * @since 2.0.0
 */
export declare function orElse<L, A, M>(ma: Either<L, A>, f: (l: L) => Either<M, A>): Either<M, A>;
/**
 * @since 2.0.0
 */
export declare function getOrElse<L, A>(ma: Either<L, A>, a: A): A;
/**
 * @since 2.0.0
 */
export declare function getOrElseL<L, A>(ma: Either<L, A>, f: (l: L) => A): A;
/**
 * @since 2.0.0
 */
export declare function filterOrElse<L, A, B extends A>(ma: Either<L, A>, refinement: Refinement<A, B>, zero: L): Either<L, B>;
export declare function filterOrElse<L, A>(ma: Either<L, A>, predicate: Predicate<A>, zero: L): Either<L, A>;
/**
 * @since 2.0.0
 */
export declare function filterOrElseL<L, A, B extends A>(ma: Either<L, A>, refinement: Refinement<A, B>, zero: (a: A) => L): Either<L, B>;
export declare function filterOrElseL<L, A>(ma: Either<L, A>, predicate: Predicate<A>, zero: (a: A) => L): Either<L, A>;
/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 *
 * @example
 * import { parseJSON, toError, right, left } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(parseJSON('{"a":1}', toError), right({ a: 1 }))
 * assert.deepStrictEqual(parseJSON('{"a":}', toError), left(new SyntaxError('Unexpected token } in JSON at position 5')))
 *
 * @since 2.0.0
 */
export declare function parseJSON<L>(s: string, onError: (reason: unknown) => L): Either<L, unknown>;
/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @example
 * import { stringifyJSON, toError, right, left } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(stringifyJSON({ a: 1 }, toError), right('{"a":1}'))
 * const circular: any = { ref: null }
 * circular.ref = circular
 * assert.deepStrictEqual(stringifyJSON(circular, toError), left(new TypeError('Converting circular structure to JSON')))
 *
 * @since 2.0.0
 */
export declare function stringifyJSON<L>(u: unknown, onError: (reason: unknown) => L): Either<L, string>;
/**
 * Builds `Compactable` instance for `Either` given a `Monoid` for the left side
 *
 * @since 2.0.0
 */
export declare function getCompactable<L>(M: Monoid<L>): Compactable2C<URI, L>;
/**
 * Builds `Filterable` instance for `Either` given a `Monoid` for the left side
 *
 * @since 2.0.0
 */
export declare function getFilterable<L>(M: Monoid<L>): Filterable2C<URI, L>;
/**
 * Builds `Witherable` instance for `Either` given `Monoid` for the left side
 *
 * @since 2.0.0
 */
export declare function getWitherable<L>(M: Monoid<L>): Witherable2C<URI, L>;
/**
 * @since 2.0.0
 */
export declare const either: Monad2<URI> & Foldable2<URI> & Traversable2<URI> & Bifunctor2<URI> & Alt2<URI> & Extend2<URI> & ChainRec2<URI> & MonadThrow2<URI>;
