import { Monad2 } from './Monad';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        Cont: Cont<L, A>;
    }
}
/**
 * @since 2.0.0
 */
export declare const URI = "Cont";
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI;
/**
 * @since 2.0.0
 */
export interface Cont<R, A> {
    (c: (a: A) => R): R;
}
/**
 * @since 2.0.0
 */
export declare const cont: Monad2<URI>;
