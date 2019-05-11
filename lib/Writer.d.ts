import { Functor2 } from './Functor';
import { Monad2C } from './Monad';
import { Monoid } from './Monoid';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        Writer: Writer<L, A>;
    }
}
/**
 * @since 2.0.0
 */
export declare const URI = "Writer";
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI;
/**
 * @since 2.0.0
 */
export interface Writer<W, A> {
    (): [A, W];
}
/**
 * @since 2.0.0
 */
export declare function evalWriter<W, A>(fa: Writer<W, A>): A;
/**
 * @since 2.0.0
 */
export declare function execWriter<W, A>(fa: Writer<W, A>): W;
/**
 * Appends a value to the accumulator
 *
 * @since 2.0.0
 */
export declare function tell<W>(w: W): Writer<W, void>;
/**
 * Modifies the result to include the changes to the accumulator
 *
 * @since 2.0.0
 */
export declare function listen<W, A>(fa: Writer<W, A>): Writer<W, [A, W]>;
/**
 * Applies the returned function to the accumulator
 *
 * @since 2.0.0
 */
export declare function pass<W, A>(fa: Writer<W, [A, (w: W) => W]>): Writer<W, A>;
/**
 * Projects a value from modifications made to the accumulator during an action
 *
 * @since 2.0.0
 */
export declare function listens<W, A, B>(fa: Writer<W, A>, f: (w: W) => B): Writer<W, [A, B]>;
/**
 * Modify the final accumulator value by applying a function
 *
 * @since 2.0.0
 */
export declare function censor<W, A>(fa: Writer<W, A>, f: (w: W) => W): Writer<W, A>;
/**
 * @since 2.0.0
 */
export declare function getMonad<W>(M: Monoid<W>): Monad2C<URI, W>;
/**
 * @since 2.0.0
 */
export declare const writer: Functor2<URI>;
