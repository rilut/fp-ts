import { Alt1 } from './Alt';
import { ChainRec1 } from './ChainRec';
import { Comonad1 } from './Comonad';
import { Foldable1 } from './Foldable';
import { Monad1 } from './Monad';
import { Eq } from './Eq';
import { Show } from './Show';
import { Traversable1 } from './Traversable';
declare module './HKT' {
    interface URI2HKT<A> {
        Identity: Identity<A>;
    }
}
export declare const URI = "Identity";
export declare type URI = typeof URI;
export declare type Identity<A> = A;
/**
 * @since 2.0.0
 */
export declare const getShow: <A>(S: Show<A>) => Show<A>;
/**
 * @since 2.0.0
 */
export declare const getEq: <A>(E: Eq<A>) => Eq<A>;
/**
 * @since 2.0.0
 */
export declare const identity: Monad1<URI> & Foldable1<URI> & Traversable1<URI> & Alt1<URI> & Comonad1<URI> & ChainRec1<URI>;
