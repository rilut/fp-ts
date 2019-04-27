import { Monad2 } from './Monad';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        State: State<L, A>;
    }
}
export declare const URI = "State";
export declare type URI = typeof URI;
/**
 * @since 2.0.0
 */
export interface State<S, A> {
    (s: S): [A, S];
}
/**
 * @since 2.0.0
 */
export declare function run<S, A>(ma: State<S, A>, s: S): [A, S];
/**
 * @since 2.0.0
 */
export declare function evalState<S, A>(ma: State<S, A>, s: S): A;
/**
 * @since 2.0.0
 */
export declare function execState<S, A>(ma: State<S, A>, s: S): S;
/**
 * Get the current state
 *
 * @since 2.0.0
 */
export declare const get: <S>() => State<S, S>;
/**
 * Set the state
 *
 * @since 2.0.0
 */
export declare const put: <S>(s: S) => State<S, void>;
/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
export declare const modify: <S>(f: (s: S) => S) => State<S, void>;
/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
export declare const gets: <S, A>(f: (s: S) => A) => State<S, A>;
/**
 * @since 2.0.0
 */
export declare const state: Monad2<URI>;
