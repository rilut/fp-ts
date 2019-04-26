/**
 * @file `IOEither<L, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `L`. If you want to represent a synchronous computation that never fails, please see `IO`.
 */
import { Alt2 } from './Alt';
import { Bifunctor2 } from './Bifunctor';
import * as E from './Either';
import { Lazy } from './function';
import { IO } from './IO';
import { Monad2 } from './Monad';
import { MonadThrow2 } from './MonadThrow';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        IOEither: IOEither<L, A>;
    }
}
export declare const URI = "IOEither";
export declare type URI = typeof URI;
/**
 * @since 2.0.0
 */
export interface IOEither<L, A> extends IO<E.Either<L, A>> {
}
/**
 * @since 2.0.0
 */
export declare function run<L, A>(fa: IOEither<L, A>): E.Either<L, A>;
/**
 * @since 2.0.0
 */
export declare const fromRight: <A>(a: A) => IOEither<never, A>;
/**
 * @since 2.0.0
 */
export declare function orElse<L, A, M>(fa: IOEither<L, A>, f: (l: L) => IOEither<M, A>): IOEither<M, A>;
/**
 * @since 2.0.0
 */
export declare function mapLeft<L, A, M>(ma: IOEither<L, A>, f: (l: L) => M): IOEither<M, A>;
/**
 * @since 2.0.0
 */
export declare const fold: <L, A, R>(ma: IOEither<L, A>, onLeft: (l: L) => R, onRight: (a: A) => R) => IO<R>;
/**
 * @since 2.0.0
 */
export declare function right<A>(fa: IO<A>): IOEither<never, A>;
/**
 * @since 2.0.0
 */
export declare function left<L>(fa: IO<L>): IOEither<L, never>;
/**
 * @since 2.0.0
 */
export declare function fromLeft<L>(l: L): IOEither<L, never>;
/**
 * @since 2.0.0
 */
export declare function tryCatch<L, A>(f: Lazy<A>, onError: (reason: unknown) => L): IOEither<L, A>;
/**
 * @since 2.0.0
 */
export declare const ioEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadThrow2<URI>;
