import { Comonad2 } from './Comonad';
import { Endomorphism } from './function';
import { Functor, Functor1, Functor2, Functor2C, Functor3 } from './Functor';
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        Store: Store<L, A>;
    }
}
/**
 * @since 2.0.0
 */
export declare const URI = "Store";
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI;
/**
 * @since 2.0.0
 */
export interface Store<S, A> {
    readonly peek: (s: S) => A;
    readonly pos: S;
}
/**
 * Reposition the focus at the specified position
 *
 * @since 2.0.0
 */
export declare function seek<S, A>(wa: Store<S, A>, s: S): Store<S, A>;
/**
 * Reposition the focus at the specified position, which depends on the current position
 *
 * @since 2.0.0
 */
export declare function seeks<S, A>(wa: Store<S, A>, f: Endomorphism<S>): Store<S, A>;
/**
 * Extract a value from a position which depends on the current position
 *
 * @since 2.0.0
 */
export declare function peeks<S, A>(wa: Store<S, A>, f: Endomorphism<S>): A;
/**
 * Extract a collection of values from positions which depend on the current position
 *
 * @since 2.0.0
 */
export declare function experiment<F extends URIS3>(F: Functor3<F>): <U, L, S, A>(wa: Store<S, A>, f: (s: S) => Type3<F, U, L, S>) => Type3<F, U, L, A>;
export declare function experiment<F extends URIS2>(F: Functor2<F>): <L, S, A>(wa: Store<S, A>, f: (s: S) => Type2<F, L, S>) => Type2<F, L, A>;
export declare function experiment<F extends URIS2, L>(F: Functor2C<F, L>): <S, A>(wa: Store<S, A>, f: (s: S) => Type2<F, L, S>) => Type2<F, L, A>;
export declare function experiment<F extends URIS>(F: Functor1<F>): <S, A>(wa: Store<S, A>, f: (s: S) => Type<F, S>) => Type<F, A>;
export declare function experiment<F>(F: Functor<F>): <S, A>(wa: Store<S, A>, f: (s: S) => HKT<F, S>) => HKT<F, A>;
/**
 * @since 2.0.0
 */
export declare const store: Comonad2<URI>;
