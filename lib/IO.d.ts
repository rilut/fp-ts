import { Monad1 } from './Monad';
import { MonadIO1 } from './MonadIO';
import { Monoid } from './Monoid';
import { Semigroup } from './Semigroup';
declare module './HKT' {
    interface URI2HKT<A> {
        IO: IO<A>;
    }
}
export declare const URI = "IO";
export declare type URI = typeof URI;
export interface IO<A> {
    (): A;
}
/**
 * @since 2.0.0
 */
export declare function getSemigroup<A>(S: Semigroup<A>): Semigroup<IO<A>>;
/**
 * @since 2.0.0
 */
export declare function getMonoid<A>(M: Monoid<A>): Monoid<IO<A>>;
/**
 * @since 2.0.0
 */
export declare const io: Monad1<URI> & MonadIO1<URI>;
