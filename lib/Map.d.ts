import { FilterableWithIndex2C } from './FilterableWithIndex';
import { Foldable3, Foldable2, Foldable1, Foldable } from './Foldable';
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT';
import { Monoid } from './Monoid';
import { Option } from './Option';
import { Ord } from './Ord';
import { Eq } from './Eq';
import { TraversableWithIndex2C } from './TraversableWithIndex';
import { Unfoldable, Unfoldable1 } from './Unfoldable';
import { Semigroup } from './Semigroup';
import { Witherable2C } from './Witherable';
import { Filterable2 } from './Filterable';
import { Show } from './Show';
import { Magma } from './Magma';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        Map: Map<L, A>;
    }
}
/**
 * @since 2.0.0
 */
export declare const URI = "Map";
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI;
/**
 * @since 2.0.0
 */
export declare function getShow<K, A>(SK: Show<K>, SA: Show<A>): Show<Map<K, A>>;
/**
 * Calculate the number of key/value pairs in a map
 *
 * @since 2.0.0
 */
export declare function size<K, A>(d: Map<K, A>): number;
/**
 * Test whether or not a map is empty
 *
 * @since 2.0.0
 */
export declare function isEmpty<K, A>(d: Map<K, A>): boolean;
/**
 * Test whether or not a key exists in a map
 *
 * @since 2.0.0
 */
export declare function member<K>(E: Eq<K>): <A>(k: K, m: Map<K, A>) => boolean;
/**
 * Test whether or not a value is a member of a map
 *
 * @since 2.0.0
 */
export declare function elem<A>(E: Eq<A>): <K>(a: A, m: Map<K, A>) => boolean;
/**
 * Get a sorted array of the keys contained in a map
 *
 * @since 2.0.0
 */
export declare function keys<K>(O: Ord<K>): <A>(m: Map<K, A>) => Array<K>;
/**
 * Get a sorted array of the values contained in a map
 *
 * @since 2.0.0
 */
export declare function values<A>(O: Ord<A>): <K>(m: Map<K, A>) => Array<A>;
/**
 * @since 2.0.0
 */
export declare function collect<K>(O: Ord<K>): <A, B>(m: Map<K, A>, f: (k: K, a: A) => B) => Array<B>;
/**
 * Get a sorted of the key/value pairs contained in a map
 *
 * @since 2.0.0
 */
export declare function toArray<K>(O: Ord<K>): <A>(m: Map<K, A>) => Array<[K, A]>;
/**
 * Unfolds a map into a list of key/value pairs
 *
 * @since 2.0.0
 */
export declare function toUnfoldable<K, F extends URIS>(O: Ord<K>, U: Unfoldable1<F>): <A>(d: Map<K, A>) => Type<F, [K, A]>;
export declare function toUnfoldable<K, F>(O: Ord<K>, U: Unfoldable<F>): <A>(d: Map<K, A>) => HKT<F, [K, A]>;
/**
 * Insert or replace a key/value pair in a map
 *
 * @since 2.0.0
 */
export declare function insert<K>(E: Eq<K>): <A>(k: K, a: A, m: Map<K, A>) => Map<K, A>;
/**
 * Delete a key and value from a map
 *
 * @since 2.0.0
 */
export declare function remove<K>(E: Eq<K>): <A>(k: K, m: Map<K, A>) => Map<K, A>;
/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 2.0.0
 */
export declare function pop<K>(E: Eq<K>): <A>(k: K, m: Map<K, A>) => Option<[A, Map<K, A>]>;
/**
 * Lookup the value for a key in a `Map`.
 * If the result is a `Some`, the existing key is also returned.
 *
 * @since 2.0.0
 */
export declare function lookupWithKey<K>(E: Eq<K>): <A>(k: K, m: Map<K, A>) => Option<[K, A]>;
/**
 * Lookup the value for a key in a `Map`.
 *
 * @since 2.0.0
 */
export declare function lookup<K>(E: Eq<K>): <A>(k: K, m: Map<K, A>) => Option<A>;
/**
 * Test whether or not one Map contains all of the keys and values contained in another Map
 *
 * @since 2.0.0
 */
export declare function isSubmap<K, A>(SK: Eq<K>, SA: Eq<A>): (d1: Map<K, A>, d2: Map<K, A>) => boolean;
/**
 * @since 2.0.0
 */
export declare const empty: Map<never, never>;
/**
 * @since 2.0.0
 */
export declare function getEq<K, A>(SK: Eq<K>, SA: Eq<A>): Eq<Map<K, A>>;
/**
 * Gets `Monoid` instance for Maps given `Semigroup` instance for their values
 *
 * @since 2.0.0
 */
export declare function getMonoid<K, A>(SK: Eq<K>, SA: Semigroup<A>): Monoid<Map<K, A>>;
/**
 * Create a map with one key/value pair
 *
 * @since 2.0.0
 */
export declare function singleton<K, A>(k: K, a: A): Map<K, A>;
/**
 * Create a map from a foldable collection of key/value pairs, using the
 * specified `Magma` to combine values for duplicate keys.
 *
 * @since 2.0.0
 */
export declare function fromFoldable<F extends URIS3, K, A>(E: Eq<K>, M: Magma<A>, F: Foldable3<F>): <U, L>(fka: Type3<F, U, L, [K, A]>) => Map<K, A>;
export declare function fromFoldable<F extends URIS2, K, A>(E: Eq<K>, M: Magma<A>, F: Foldable2<F>): <L>(fka: Type2<F, L, [K, A]>) => Map<K, A>;
export declare function fromFoldable<F extends URIS, K, A>(E: Eq<K>, M: Magma<A>, F: Foldable1<F>): (fka: Type<F, [K, A]>) => Map<K, A>;
export declare function fromFoldable<F, K, A>(E: Eq<K>, M: Magma<A>, F: Foldable<F>): (fka: HKT<F, [K, A]>) => Map<K, A>;
/**
 * @since 2.0.0
 */
export declare function getFilterableWithIndex<K>(): FilterableWithIndex2C<URI, K, K>;
/**
 * @since 2.0.0
 */
export declare function getWitherable<K>(O: Ord<K>): Witherable2C<URI, K>;
/**
 * @since 2.0.0
 */
export declare function getTraversableWithIndex<K>(O: Ord<K>): TraversableWithIndex2C<URI, K, K>;
/**
 * @since 2.0.0
 */
export declare const map: Filterable2<URI>;
