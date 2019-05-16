import { Alt2C } from './Alt';
import { Applicative2C } from './Applicative';
import { Either, URI } from './Either';
import { Monad2C } from './Monad';
import { Monoid } from './Monoid';
import { Semigroup } from './Semigroup';
import { Foldable2C } from './Foldable';
import { Bifunctor2C } from './Bifunctor';
import { Traversable2C } from './Traversable';
import { Extend2C } from './Extend';
export declare function getApplicative<L>(S: Semigroup<L>): Applicative2C<URI, L> & Foldable2C<URI, L> & Traversable2C<URI, L> & Bifunctor2C<URI, L> & Extend2C<URI, L>;
/**
 * **Note**: This function is here just to avoid switching to / from `Either`
 *
 * @since 2.0.0
 */
export declare function getMonad<L>(S: Semigroup<L>): Monad2C<URI, L> & Foldable2C<URI, L> & Traversable2C<URI, L> & Bifunctor2C<URI, L> & Extend2C<URI, L>;
/**
 * @since 2.0.0
 */
export declare function getSemigroup<L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Either<L, A>>;
/**
 * @since 2.0.0
 */
export declare function getMonoid<L, A>(SL: Semigroup<L>, SA: Monoid<A>): Monoid<Either<L, A>>;
/**
 * @since 2.0.0
 */
export declare function getAlt<L>(S: Semigroup<L>): Alt2C<URI, L>;
