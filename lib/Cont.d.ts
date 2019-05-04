import { Monad2 } from './Monad';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        Cont: Cont<L, A>;
    }
}
export declare const URI = "Cont";
export declare type URI = typeof URI;
/**
 * @since 2.0.0
 */
export interface Cont<L, A> {
    (c: (a: A) => L): L;
}
/**
 * @since 2.0.0
 */
export declare const cont: Monad2<URI>;
