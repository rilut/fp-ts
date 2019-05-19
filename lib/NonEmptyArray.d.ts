/**
 * @file Data structure which represents non-empty arrays
 */
import { Monad1 } from './Monad';
import { Comonad1 } from './Comonad';
import { FunctorWithIndex1 } from './FunctorWithIndex';
import { TraversableWithIndex1 } from './TraversableWithIndex';
import { FoldableWithIndex1 } from './FoldableWithIndex';
import { Ord } from './Ord';
import { Semigroup } from './Semigroup';
import { Option } from './Option';
import { Eq } from './Eq';
import { Predicate, Refinement } from './function';
import { Show } from './Show';
declare module './HKT' {
    interface URI2HKT<A> {
        NonEmptyArray: NonEmptyArray<A>;
    }
}
/**
 * @since 2.0.0
 */
export declare const URI = "NonEmptyArray";
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI;
/**
 * @since 2.0.0
 */
export interface NonEmptyArray<A> extends Array<A> {
    0: A;
    map<B>(f: (a: A, index: number, nea: NonEmptyArray<A>) => B): NonEmptyArray<B>;
    concat(as: Array<A>): NonEmptyArray<A>;
}
/**
 * @since 2.0.0
 */
export declare function getShow<A>(S: Show<A>): Show<NonEmptyArray<A>>;
/**
 * @since 2.0.0
 */
export declare function head<A>(nea: NonEmptyArray<A>): A;
/**
 * @since 2.0.0
 */
export declare function tail<A>(nea: NonEmptyArray<A>): Array<A>;
/**
 * @since 2.0.0
 */
export declare const reverse: <A>(nea: NonEmptyArray<A>) => NonEmptyArray<A>;
/**
 * @since 2.0.0
 */
export declare function min<A>(ord: Ord<A>): (nea: NonEmptyArray<A>) => A;
/**
 * @since 2.0.0
 */
export declare function max<A>(ord: Ord<A>): (nea: NonEmptyArray<A>) => A;
/**
 * Builds a `NonEmptyArray` from an `Array` returning `none` if `as` is an empty array
 *
 * @since 2.0.0
 */
export declare function fromArray<A>(as: Array<A>): Option<NonEmptyArray<A>>;
/**
 * Builds a `NonEmptyArray` from a provably (compile time) non empty `Array`.
 *
 * @since 2.0.0
 */
export declare function fromNonEmptyArray<A>(as: Array<A> & {
    0: A;
}): NonEmptyArray<A>;
/**
 * Builds a `Semigroup` instance for `NonEmptyArray`
 *
 * @since 2.0.0
 */
export declare function getSemigroup<A = never>(): Semigroup<NonEmptyArray<A>>;
/**
 * @example
 * import { fromNonEmptyArray, getEq, cons } from 'fp-ts/lib/NonEmptyArray'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * const E = getEq(eqNumber)
 * assert.strictEqual(E.equals(cons(1, [2]), fromNonEmptyArray([1, 2])), true)
 * assert.strictEqual(E.equals(cons(1, [2]), fromNonEmptyArray([1, 3])), false)
 *
 * @since 2.0.0
 */
export declare const getEq: <A>(E: Eq<A>) => Eq<NonEmptyArray<A>>;
/**
 * Group equal, consecutive elements of an array into non empty arrays.
 *
 * @example
 * import { cons, group } from 'fp-ts/lib/NonEmptyArray'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(group(ordNumber)([1, 2, 1, 1]), [
 *   cons(1, []),
 *   cons(2, []),
 *   cons(1, [1])
 * ])
 *
 * @since 2.0.0
 */
export declare function group<A>(E: Eq<A>): (as: Array<A>) => Array<NonEmptyArray<A>>;
/**
 * Sort and then group the elements of an array into non empty arrays.
 *
 * @example
 * import { cons, groupSort } from 'fp-ts/lib/NonEmptyArray'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(groupSort(ordNumber)([1, 2, 1, 1]), [cons(1, [1, 1]), cons(2, [])])
 *
 * @since 2.0.0
 */
export declare function groupSort<A>(O: Ord<A>): (as: Array<A>) => Array<NonEmptyArray<A>>;
/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { cons, groupBy } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy(['foo', 'bar', 'foobar'], a => String(a.length)), {
 *   '3': cons('foo', ['bar']),
 *   '6': cons('foobar', [])
 * })
 *
 * @since 2.0.0
 */
export declare function groupBy<A>(as: Array<A>, f: (a: A) => string): {
    [key: string]: NonEmptyArray<A>;
};
/**
 * @since 2.0.0
 */
export declare function last<A>(nea: NonEmptyArray<A>): A;
/**
 * @since 2.0.0
 */
export declare function sort<A>(O: Ord<A>): (nea: NonEmptyArray<A>) => NonEmptyArray<A>;
/**
 * @since 2.0.0
 */
export declare function findFirst<A, B extends A>(nea: NonEmptyArray<A>, refinement: Refinement<A, B>): Option<B>;
export declare function findFirst<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<A>;
/**
 * @since 2.0.0
 */
export declare function findLast<A, B extends A>(nea: NonEmptyArray<A>, refinement: Refinement<A, B>): Option<B>;
export declare function findLast<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<A>;
/**
 * @since 2.0.0
 */
export declare function findIndex<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<number>;
/**
 * @since 2.0.0
 */
export declare function findLastIndex<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<number>;
/**
 * @since 2.0.0
 */
export declare function insertAt<A>(i: number, a: A, nea: NonEmptyArray<A>): Option<NonEmptyArray<A>>;
/**
 * @since 2.0.0
 */
export declare function updateAt<A>(i: number, a: A, nea: NonEmptyArray<A>): Option<NonEmptyArray<A>>;
/**
 * @since 2.0.0
 */
export declare function modifyAt<A>(i: number, nea: NonEmptyArray<A>, f: (a: A) => A): Option<NonEmptyArray<A>>;
/**
 * @since 2.0.0
 */
export declare const copy: <A>(nea: NonEmptyArray<A>) => NonEmptyArray<A>;
/**
 * @since 2.0.0
 */
export declare function filter<A, B extends A>(nea: NonEmptyArray<A>, refinement: Refinement<A, B>): Option<NonEmptyArray<A>>;
export declare function filter<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<NonEmptyArray<A>>;
/**
 * @since 2.0.0
 */
export declare function filterWithIndex<A>(nea: NonEmptyArray<A>, predicate: (i: number, a: A) => boolean): Option<NonEmptyArray<A>>;
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @since 2.0.0
 */
export declare const snoc: <A>(as: Array<A>, a: A) => NonEmptyArray<A>;
/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
 *
 * @since 2.0.0
 */
export declare const cons: <A>(a: A, as: Array<A>) => NonEmptyArray<A>;
/**
 * @since 2.0.0
 */
export declare const nonEmptyArray: Monad1<URI> & Comonad1<URI> & TraversableWithIndex1<URI, number> & FunctorWithIndex1<URI, number> & FoldableWithIndex1<URI, number>;
