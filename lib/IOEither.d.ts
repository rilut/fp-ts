/**
 * @file `IOEither<L, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `L`. If you want to represent a synchronous computation that never fails, please see `IO`.
 */
import { Alt2 } from './Alt';
import { Bifunctor2 } from './Bifunctor';
import * as E from './Either';
import { Lazy, Predicate, Refinement } from './function';
import { IO } from './IO';
import { Monad2 } from './Monad';
import { MonadIO2 } from './MonadIO';
import { MonadThrow2 } from './MonadThrow';
import { Monoid } from './Monoid';
import { Option } from './Option';
import { Semigroup } from './Semigroup';
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
export declare const left: <L>(l: L) => IOEither<L, never>;
/**
 * @since 2.0.0
 */
export declare const right: <A>(a: A) => IOEither<never, A>;
/**
 * @since 2.0.0
 */
export declare const rightIO: <A>(ma: IO<A>) => IOEither<never, A>;
/**
 * @since 2.0.0
 */
export declare const leftIO: <L>(ml: IO<L>) => IOEither<L, never>;
/**
 * @since 2.0.0
 */
export declare const fromEither: <L, A>(ma: E.Either<L, A>) => IOEither<L, A>;
/**
 * @since 2.0.0
 */
export declare function fromOption<L, A>(ma: Option<A>, onNone: () => L): IOEither<L, A>;
/**
 * @since 2.0.0
 */
export declare function fromPredicate<L, A, B extends A>(predicate: Refinement<A, B>, onFalse: (a: A) => L): (a: A) => IOEither<L, B>;
export declare function fromPredicate<L, A>(predicate: Predicate<A>, onFalse: (a: A) => L): (a: A) => IOEither<L, A>;
/**
 * @since 2.0.0
 */
export declare const fold: <L, A, R>(ma: IOEither<L, A>, onLeft: (l: L) => R, onRight: (a: A) => R) => IO<R>;
/**
 * @since 2.0.0
 */
export declare const foldIO: <L, A, R>(ma: IOEither<L, A>, onLeft: (l: L) => IO<R>, onRight: (a: A) => IO<R>) => IO<R>;
/**
 * @since 2.0.0
 */
export declare const mapLeft: <L, A, M>(ma: IOEither<L, A>, f: (l: L) => M) => IOEither<M, A>;
/**
 * @since 2.0.0
 */
export declare const getOrElse: <L, A>(ma: IOEither<L, A>, f: (l: L) => A) => IO<A>;
/**
 * @since 2.0.0
 */
export declare function filterOrElse<L, A, B extends A>(ma: IOEither<L, A>, p: Refinement<A, B>, zero: (a: A) => L): IOEither<L, B>;
export declare function filterOrElse<L, A>(ma: IOEither<L, A>, p: Predicate<A>, zero: (a: A) => L): IOEither<L, A>;
/**
 * @since 2.0.0
 */
export declare const orElse: <L, A, M>(ma: IOEither<L, A>, f: (l: L) => IOEither<M, A>) => IOEither<M, A>;
/**
 * @since 2.0.0
 */
export declare const swap: <L, A>(ma: IOEither<L, A>) => IOEither<A, L>;
/**
 * @since 2.0.0
 */
export declare function getSemigroup<L, A>(S: Semigroup<A>): Semigroup<IOEither<L, A>>;
/**
 * @since 2.0.0
 */
export declare function getApplySemigroup<L, A>(S: Semigroup<A>): Semigroup<IOEither<L, A>>;
/**
 * @since 2.0.0
 */
export declare function getApplyMonoid<L, A>(M: Monoid<A>): Monoid<IOEither<L, A>>;
/**
 * Constructs a new `IOEither` from a function that performs a side effect and might throw
 * @since 2.0.0
 */
export declare function tryCatch<L, A>(f: Lazy<A>, onError: (reason: unknown) => L): IOEither<L, A>;
/**
 * Make sure that a resource is cleaned up in the event of an exception. The
 * release action is called regardless of whether the body action throws or
 * returns.
 *
 * @since 2.0.0
 */
export declare function bracket<L, A, B>(acquire: IOEither<L, A>, use: (a: A) => IOEither<L, B>, release: (a: A, e: E.Either<L, B>) => IOEither<L, void>): IOEither<L, B>;
/**
 * @since 2.0.0
 */
export declare const ioEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadIO2<URI> & MonadThrow2<URI>;
