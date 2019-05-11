import { Category2 } from './Category';
import { Choice2 } from './Choice';
import { Monad2 } from './Monad';
import { Monoid } from './Monoid';
import { Profunctor2 } from './Profunctor';
import { Semigroup } from './Semigroup';
import { Strong2 } from './Strong';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        Reader: Reader<L, A>;
    }
}
/**
 * @since 2.0.0
 */
export declare const URI = "Reader";
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI;
/**
 * @since 2.0.0
 */
export interface Reader<E, A> {
    (e: E): A;
}
/**
 * Reads the current context
 *
 * @since 2.0.0
 */
export declare const ask: <E>() => Reader<E, E>;
/**
 * Projects a value from the global context in a Reader
 *
 * @since 2.0.0
 */
export declare const asks: <E, A>(f: (e: E) => A) => Reader<E, A>;
/**
 * changes the value of the local context during the execution of the action `ma`
 *
 * @since 2.0.0
 */
export declare const local: <E, A, D>(ma: Reader<E, A>, f: (d: D) => E) => Reader<D, A>;
/**
 * @since 2.0.0
 */
export declare function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<Reader<E, A>>;
/**
 * @since 2.0.0
 */
export declare function getMonoid<E, A>(M: Monoid<A>): Monoid<Reader<E, A>>;
/**
 * @since 2.0.0
 */
export declare const reader: Monad2<URI> & Profunctor2<URI> & Category2<URI> & Strong2<URI> & Choice2<URI>;
