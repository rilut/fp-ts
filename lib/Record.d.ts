import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3 } from './Applicative';
import { Compactable1, Separated } from './Compactable';
import { Either } from './Either';
import { FilterableWithIndex1 } from './FilterableWithIndex';
import { Foldable, Foldable1, Foldable2, Foldable3 } from './Foldable';
import { FoldableWithIndex1 } from './FoldableWithIndex';
import { Predicate, Refinement } from './function';
import { FunctorWithIndex1 } from './FunctorWithIndex';
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT';
import { Magma } from './Magma';
import { Monoid } from './Monoid';
import { Option } from './Option';
import { Semigroup } from './Semigroup';
import { Eq } from './Eq';
import { Show } from './Show';
import { TraversableWithIndex1 } from './TraversableWithIndex';
import { Unfoldable, Unfoldable1 } from './Unfoldable';
import { Witherable1 } from './Witherable';
declare module './HKT' {
    interface URI2HKT<A> {
        Record: Record<string, A>;
    }
}
/**
 * @since 2.0.0
 */
export declare const URI = "Record";
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI;
/**
 * @since 2.0.0
 */
export declare function getShow<A>(S: Show<A>): Show<Record<string, A>>;
/**
 * Calculate the number of key/value pairs in a record
 *
 * @since 2.0.0
 */
export declare function size(r: Record<string, unknown>): number;
/**
 * Test whether a record is empty
 *
 * @since 2.0.0
 */
export declare function isEmpty(r: Record<string, unknown>): boolean;
/**
 * @since 2.0.0
 */
export declare function keys<K extends string>(r: Record<K, unknown>): Array<K>;
/**
 * @since 2.0.0
 */
export declare function collect<K extends string, A, B>(r: Record<K, A>, f: (k: K, a: A) => B): Array<B>;
/**
 * @since 2.0.0
 */
export declare function toArray<K extends string, A>(d: Record<K, A>): Array<[K, A]>;
/**
 * Unfolds a record into a list of key/value pairs
 *
 * @since 2.0.0
 */
export declare function toUnfoldable<F extends URIS>(unfoldable: Unfoldable1<F>): <K extends string, A>(d: Record<K, A>) => Type<F, [K, A]>;
export declare function toUnfoldable<F>(unfoldable: Unfoldable<F>): <K extends string, A>(d: Record<K, A>) => HKT<F, [K, A]>;
/**
 * Insert or replace a key/value pair in a map
 *
 * @since 2.0.0
 */
export declare function insert<KS extends string, K extends string, A>(k: K, a: A, d: Record<KS, A>): Record<KS | K, A>;
/**
 * Delete a key and value from a map
 *
 * @since 2.0.0
 */
export declare function remove<K extends string, KS extends string, A>(k: K, d: Record<KS, A>): Record<string extends K ? string : Exclude<KS, K>, A>;
/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 2.0.0
 */
export declare function pop<K extends string, KS extends string, A>(k: K, d: Record<KS, A>): Option<[A, Record<Exclude<KS, K>, A>]>;
/**
 * Test whether one record contains all of the keys and values contained in another record
 *
 * @since 2.0.0
 */
export declare function isSubrecord<A>(E: Eq<A>): (d1: Record<string, A>, d2: Record<string, A>) => boolean;
/**
 * @since 2.0.0
 */
export declare function getEq<K extends string, A>(E: Eq<A>): Eq<Record<K, A>>;
/**
 * Returns a `Semigroup` instance for records given a `Semigroup` instance for their values
 *
 * @example
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 * import { getMonoid } from 'fp-ts/lib/Record'
 *
 * const M = getMonoid(semigroupSum)
 * assert.deepStrictEqual(M.concat({ foo: 123 }, { foo: 456 }), { foo: 579 })
 *
 * @since 2.0.0
 */
export declare function getMonoid<K extends string, A>(S: Semigroup<A>): Monoid<Record<K, A>>;
/**
 * Lookup the value for a key in a record
 *
 * @since 2.0.0
 */
export declare function lookup<A>(key: string, fa: Record<string, A>): Option<A>;
/**
 * @since 2.0.0
 */
export declare function filter<A, B extends A>(fa: Record<string, A>, p: Refinement<A, B>): Record<string, B>;
export declare function filter<A>(fa: Record<string, A>, p: Predicate<A>): Record<string, A>;
/**
 * @since 2.0.0
 */
export declare const empty: Record<string, never>;
/**
 * @since 2.0.0
 */
export declare function mapWithIndex<K extends string, A, B>(fa: Record<K, A>, f: (k: K, a: A) => B): Record<K, B>;
/**
 * @since 2.0.0
 */
export declare function map<K extends string, A, B>(fa: Record<K, A>, f: (a: A) => B): Record<K, B>;
/**
 * @since 2.0.0
 */
export declare function reduceWithIndex<K extends string, A, B>(fa: Record<K, A>, b: B, f: (k: K, b: B, a: A) => B): B;
/**
 * @since 2.0.0
 */
export declare function foldMapWithIndex<M>(M: Monoid<M>): <K extends string, A>(fa: Record<K, A>, f: (k: K, a: A) => M) => M;
/**
 * @since 2.0.0
 */
export declare function reduceRightWithIndex<K extends string, A, B>(fa: Record<K, A>, b: B, f: (k: K, a: A, b: B) => B): B;
/**
 * Create a record with one key/value pair
 *
 * @since 2.0.0
 */
export declare function singleton<K extends string, A>(k: K, a: A): Record<K, A>;
/**
 * @since 2.0.0
 */
export declare function traverseWithIndex<F extends URIS3>(F: Applicative3<F>): <K extends string, U, L, A, B>(ta: Record<K, A>, f: (k: K, a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Record<K, B>>;
export declare function traverseWithIndex<F extends URIS2>(F: Applicative2<F>): <K extends string, L, A, B>(ta: Record<K, A>, f: (k: K, a: A) => Type2<F, L, B>) => Type2<F, L, Record<K, B>>;
export declare function traverseWithIndex<F extends URIS>(F: Applicative1<F>): <K extends string, A, B>(ta: Record<K, A>, f: (k: K, a: A) => Type<F, B>) => Type<F, Record<K, B>>;
export declare function traverseWithIndex<F>(F: Applicative<F>): <K extends string, A, B>(ta: Record<K, A>, f: (k: K, a: A) => HKT<F, B>) => HKT<F, Record<K, B>>;
/**
 * @since 2.0.0
 */
export declare function traverse<F extends URIS3>(F: Applicative3<F>): <K extends string, U, L, A, B>(ta: Record<K, A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Record<K, B>>;
export declare function traverse<F extends URIS2>(F: Applicative2<F>): <K extends string, L, A, B>(ta: Record<K, A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, Record<K, B>>;
export declare function traverse<F extends URIS2, L>(F: Applicative2C<F, L>): <K extends string, A, B>(ta: Record<K, A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, Record<K, B>>;
export declare function traverse<F extends URIS>(F: Applicative1<F>): <K extends string, A, B>(ta: Record<K, A>, f: (a: A) => Type<F, B>) => Type<F, Record<K, B>>;
export declare function traverse<F>(F: Applicative<F>): <K extends string, A, B>(ta: Record<K, A>, f: (a: A) => HKT<F, B>) => HKT<F, Record<K, B>>;
/**
 * @since 2.0.0
 */
export declare function sequence<F extends URIS3>(F: Applicative3<F>): <K extends string, U, L, A>(ta: Record<K, Type3<F, U, L, A>>) => Type3<F, U, L, Record<K, A>>;
export declare function sequence<F extends URIS2>(F: Applicative2<F>): <K extends string, L, A>(ta: Record<K, Type2<F, L, A>>) => Type2<F, L, Record<K, A>>;
export declare function sequence<F extends URIS2, L>(F: Applicative2C<F, L>): <K extends string, A>(ta: Record<K, Type2<F, L, A>>) => Type2<F, L, Record<K, A>>;
export declare function sequence<F extends URIS>(F: Applicative1<F>): <K extends string, A>(ta: Record<K, Type<F, A>>) => Type<F, Record<K, A>>;
export declare function sequence<F>(F: Applicative<F>): <K extends string, A>(ta: Record<K, HKT<F, A>>) => HKT<F, Record<K, A>>;
/**
 * @since 2.0.0
 */
export declare function partitionMapWithIndex<K extends string, RL, RR, A>(fa: Record<K, A>, f: (key: K, a: A) => Either<RL, RR>): Separated<Record<string, RL>, Record<string, RR>>;
export declare function partitionMapWithIndex<RL, RR, A>(fa: Record<string, A>, f: (key: string, a: A) => Either<RL, RR>): Separated<Record<string, RL>, Record<string, RR>>;
/**
 * @since 2.0.0
 */
export declare function partitionWithIndex<K extends string, A>(fa: Record<K, A>, p: (key: K, a: A) => boolean): Separated<Record<string, A>, Record<string, A>>;
export declare function partitionWithIndex<A>(fa: Record<string, A>, p: (key: string, a: A) => boolean): Separated<Record<string, A>, Record<string, A>>;
/**
 * @since 2.0.0
 */
export declare function filterMapWithIndex<K extends string, A, B>(fa: Record<K, A>, f: (key: K, a: A) => Option<B>): Record<string, B>;
export declare function filterMapWithIndex<A, B>(fa: Record<string, A>, f: (key: string, a: A) => Option<B>): Record<string, B>;
/**
 * @since 2.0.0
 */
export declare function filterWithIndex<K extends string, A>(fa: Record<K, A>, p: (key: K, a: A) => boolean): Record<string, A>;
export declare function filterWithIndex<A>(fa: Record<string, A>, p: (key: string, a: A) => boolean): Record<string, A>;
/**
 * Create a record from a foldable collection of key/value pairs, using the
 * specified `Magma` to combine values for duplicate keys.
 *
 * @since 2.0.0
 */
export declare function fromFoldable<F extends URIS3, A>(M: Magma<A>, F: Foldable3<F>): <K extends string, U, L>(fka: Type3<F, U, L, [K, A]>) => Record<K, A>;
export declare function fromFoldable<F extends URIS2, A>(M: Magma<A>, F: Foldable2<F>): <K extends string, L>(fka: Type2<F, L, [K, A]>) => Record<K, A>;
export declare function fromFoldable<F extends URIS, A>(M: Magma<A>, F: Foldable1<F>): <K extends string>(fka: Type<F, [K, A]>) => Record<K, A>;
export declare function fromFoldable<F, A>(M: Magma<A>, F: Foldable<F>): <K extends string>(fka: HKT<F, [K, A]>) => Record<K, A>;
/**
 * Create a record from a foldable collection using the specified functions to
 *
 * - map to key/value pairs
 * - combine values for duplicate keys.
 *
 * @example
 * import { getLastSemigroup } from 'fp-ts/lib/Semigroup'
 * import { array, zip } from 'fp-ts/lib/Array'
 * import { identity } from 'fp-ts/lib/function'
 * import { fromFoldableMap } from 'fp-ts/lib/Record'
 *
 * // like lodash `zipObject` or ramda `zipObj`
 * export const zipObject = <K extends string, A>(keys: Array<K>, values: Array<A>): Record<K, A> =>
 *   fromFoldableMap(getLastSemigroup<A>(), array)(zip(keys, values), identity)
 *
 * assert.deepStrictEqual(zipObject(['a', 'b'], [1, 2, 3]), { a: 1, b: 2 })
 *
 * // build a record from a field
 * interface User {
 *   id: string
 *   name: string
 * }
 *
 * const users: Array<User> = [
 *   { id: 'id1', name: 'name1' },
 *   { id: 'id2', name: 'name2' },
 *   { id: 'id1', name: 'name3' }
 * ]
 *
 * assert.deepStrictEqual(fromFoldableMap(getLastSemigroup<User>(), array)(users, user => [user.id, user]), {
 *   id1: { id: 'id1', name: 'name3' },
 *   id2: { id: 'id2', name: 'name2' }
 * })
 *
 * @since 2.0.0
 */
export declare function fromFoldableMap<F extends URIS3, B>(M: Magma<B>, F: Foldable3<F>): <U, L, A, K extends string>(fa: Type3<F, U, L, A>, f: (a: A) => [K, B]) => Record<K, B>;
export declare function fromFoldableMap<F extends URIS2, B>(M: Magma<B>, F: Foldable2<F>): <L, A, K extends string>(fa: Type2<F, L, A>, f: (a: A) => [K, B]) => Record<K, B>;
export declare function fromFoldableMap<F extends URIS, B>(M: Magma<B>, F: Foldable1<F>): <A, K extends string>(fa: Type<F, A>, f: (a: A) => [K, B]) => Record<K, B>;
export declare function fromFoldableMap<F, B>(M: Magma<B>, F: Foldable<F>): <A, K extends string>(fa: HKT<F, A>, f: (a: A) => [K, B]) => Record<K, B>;
/**
 * @since 2.0.0
 */
export declare function every<A>(fa: Record<string, A>, predicate: (a: A) => boolean): boolean;
/**
 * @since 2.0.0
 */
export declare function some<A>(fa: Record<string, A>, predicate: (a: A) => boolean): boolean;
/**
 * @since 2.0.0
 */
export declare function elem<A>(E: Eq<A>): (a: A, fa: Record<string, A>) => boolean;
/**
 * @since 2.0.0
 */
export declare const record: FunctorWithIndex1<URI, string> & Foldable1<URI> & TraversableWithIndex1<URI, string> & Compactable1<URI> & FilterableWithIndex1<URI, string> & Witherable1<URI> & FoldableWithIndex1<URI, string>;
