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
import { Alt2, Alt2C } from './Alt';
import { Applicative2C } from './Applicative';
import { Bifunctor2, Bifunctor2C } from './Bifunctor';
import { ChainRec2 } from './ChainRec';
import { Compactable2C } from './Compactable';
import { Eq } from './Eq';
import { Extend2, Extend2C } from './Extend';
import { Filterable2C } from './Filterable';
import { Foldable2, Foldable2C } from './Foldable';
import { Lazy, Predicate, Refinement } from './function';
import { Monad2, Monad2C } from './Monad';
import { Monoid } from './Monoid';
import { Option } from './Option';
import { Semigroup } from './Semigroup';
import { Show } from './Show';
import { Traversable2, Traversable2C } from './Traversable';
import { Witherable2C } from './Witherable';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        Either: Either<L, A>;
    }
}
/**
 * @since 2.0.0
 */
export declare const URI = "Either";
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI;
/**
 * @since 2.0.0
 */
export interface Left<L> {
    readonly _tag: 'Left';
    readonly left: L;
}
/**
 * @since 2.0.0
 */
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
export declare function fromOption<L, A>(ma: Option<A>, onNone: () => L): Either<L, A>;
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
 * @since 2.0.0
 */
export declare function fold<L, A, R>(onLeft: (l: L) => R, onRight: (a: A) => R): (ma: Either<L, A>) => R;
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
export declare function swap<L, A>(ma: Either<L, A>): Either<A, L>;
/**
 * @since 2.0.0
 */
export declare function orElse<L, A, M>(f: (l: L) => Either<M, A>): (ma: Either<L, A>) => Either<M, A>;
/**
 * @since 2.0.0
 */
export declare function getOrElse<L, A>(f: (l: L) => A): (ma: Either<L, A>) => A;
/**
 * @since 2.0.0
 */
export declare function elem<A>(E: Eq<A>): <L>(a: A, ma: Either<L, A>) => boolean;
/**
 * @since 2.0.0
 */
export declare function filterOrElse<L, A, B extends A>(refinement: Refinement<A, B>, zero: (a: A) => L): (ma: Either<L, A>) => Either<L, B>;
export declare function filterOrElse<L, A>(predicate: Predicate<A>, zero: (a: A) => L): (ma: Either<L, A>) => Either<L, A>;
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
export declare function getValidationApplicative<L>(S: Semigroup<L>): Applicative2C<URI, L> & Foldable2C<URI, L> & Traversable2C<URI, L> & Bifunctor2C<URI, L> & Extend2C<URI, L>;
/**
 * **Note**: This function is here just to avoid switching to / from `Either`
 *
 * @since 2.0.0
 */
export declare function getValidationMonad<L>(S: Semigroup<L>): Monad2C<URI, L> & Foldable2C<URI, L> & Traversable2C<URI, L> & Bifunctor2C<URI, L> & Extend2C<URI, L>;
/**
 * @since 2.0.0
 */
export declare function getValidationSemigroup<L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Either<L, A>>;
/**
 * @since 2.0.0
 */
export declare function getValidationMonoid<L, A>(SL: Semigroup<L>, SA: Monoid<A>): Monoid<Either<L, A>>;
/**
 * @since 2.0.0
 */
export declare function getValidationAlt<L>(S: Semigroup<L>): Alt2C<URI, L>;
/**
 * @since 2.0.0
 */
export declare const either: Monad2<URI> & Foldable2<URI> & Traversable2<URI> & Bifunctor2<URI> & Alt2<URI> & Extend2<URI> & ChainRec2<URI>;
