import { Applicative2C } from './Applicative';
import { Apply2C } from './Apply';
import { Contravariant2 } from './Contravariant';
import { Functor2 } from './Functor';
import { Monoid } from './Monoid';
import { Semigroup } from './Semigroup';
import { Eq } from './Eq';
import { Show } from './Show';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        Const: Const<L, A>;
    }
}
export declare const URI = "Const";
export declare type URI = typeof URI;
export declare type Const<L, A> = L & {
    A: A;
};
/**
 * @since 2.0.0
 */
export declare const make: <L>(l: L) => Const<L, never>;
/**
 * @since 2.0.0
 */
export declare const getShow: <L, A>(S: Show<L>) => Show<Const<L, A>>;
/**
 * @since 2.0.0
 */
export declare function getEq<L, A>(E: Eq<L>): Eq<Const<L, A>>;
/**
 * @since 2.0.0
 */
export declare const getApply: <L>(S: Semigroup<L>) => Apply2C<"Const", L>;
/**
 * @since 2.0.0
 */
export declare const getApplicative: <L>(M: Monoid<L>) => Applicative2C<"Const", L>;
/**
 * @since 2.0.0
 */
export declare const const_: Functor2<URI> & Contravariant2<URI>;
