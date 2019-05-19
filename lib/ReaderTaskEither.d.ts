import { Alt3 } from './Alt';
import { Bifunctor3 } from './Bifunctor';
import { Either } from './Either';
import { Predicate, Refinement } from './function';
import { IO } from './IO';
import { IOEither } from './IOEither';
import { Monad3 } from './Monad';
import { MonadIO3 } from './MonadIO';
import { MonadTask3 } from './MonadTask';
import { Option } from './Option';
import { Reader } from './Reader';
import { Task } from './Task';
import * as TE from './TaskEither';
import TaskEither = TE.TaskEither;
declare module './HKT' {
    interface URI2HKT3<U, L, A> {
        ReaderTaskEither: ReaderTaskEither<U, L, A>;
    }
}
/**
 * @since 2.0.0
 */
export declare const URI = "ReaderTaskEither";
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI;
/**
 * @since 2.0.0
 */
export interface ReaderTaskEither<R, E, A> {
    (r: R): TaskEither<E, A>;
}
/**
 * @since 2.0.0
 */
export declare function run<R, E, A>(ma: ReaderTaskEither<R, E, A>, r: R): Promise<Either<E, A>>;
/**
 * @since 2.0.0
 */
export declare function left<E>(e: E): ReaderTaskEither<unknown, E, never>;
/**
 * @since 2.0.0
 */
export declare const right: <A>(a: A) => ReaderTaskEither<unknown, never, A>;
/**
 * @since 2.0.0
 */
export declare function rightTask<A>(ma: Task<A>): ReaderTaskEither<unknown, never, A>;
/**
 * @since 2.0.0
 */
export declare function leftTask<E>(me: Task<E>): ReaderTaskEither<unknown, E, never>;
/**
 * @since 2.0.0
 */
export declare const fromTaskEither: <E, A>(ma: TaskEither<E, A>) => ReaderTaskEither<unknown, E, A>;
/**
 * @since 2.0.0
 */
export declare const rightReader: <R, A>(ma: Reader<R, A>) => ReaderTaskEither<R, never, A>;
/**
 * @since 2.0.0
 */
export declare function leftReader<R, E>(me: Reader<R, E>): ReaderTaskEither<R, E, never>;
/**
 * @since 2.0.0
 */
export declare function fromIOEither<E, A>(ma: IOEither<E, A>): ReaderTaskEither<unknown, E, A>;
/**
 * @since 2.0.0
 */
export declare function fromEither<E, A>(ma: Either<E, A>): ReaderTaskEither<unknown, E, A>;
/**
 * @since 2.0.0
 */
export declare function fromOption<E, A>(ma: Option<A>, onNone: () => E): ReaderTaskEither<unknown, E, A>;
/**
 * @since 2.0.0
 */
export declare function rightIO<A>(ma: IO<A>): ReaderTaskEither<unknown, never, A>;
/**
 * @since 2.0.0
 */
export declare function leftIO<E>(me: IO<E>): ReaderTaskEither<unknown, E, never>;
/**
 * @since 2.0.0
 */
export declare function fromPredicate<E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => ReaderTaskEither<unknown, E, B>;
export declare function fromPredicate<E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => ReaderTaskEither<unknown, E, A>;
/**
 * @since 2.0.0
 */
export declare function fold<R, E, A, B>(onLeft: (e: E) => Reader<R, Task<B>>, onRight: (a: A) => Reader<R, Task<B>>): (ma: ReaderTaskEither<R, E, A>) => Reader<R, Task<B>>;
/**
 * @since 2.0.0
 */
export declare function getOrElse<R, E, A>(onLeft: (e: E) => Reader<R, Task<A>>): (ma: ReaderTaskEither<R, E, A>) => Reader<R, Task<A>>;
/**
 * @since 2.0.0
 */
export declare function orElse<R, E, A, M>(f: (e: E) => ReaderTaskEither<R, M, A>): (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, M, A>;
/**
 * @since 2.0.0
 */
export declare const ask: <R>() => ReaderTaskEither<R, never, R>;
/**
 * @since 2.0.0
 */
export declare const asks: <R, A>(f: (r: R) => A) => ReaderTaskEither<R, never, A>;
/**
 * @since 2.0.0
 */
export declare const local: <Q, R>(f: (f: Q) => R) => <E, A>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<Q, E, A>;
/**
 * @since 2.0.0
 */
export declare const readerTaskEither: Monad3<URI> & Bifunctor3<URI> & Alt3<URI> & MonadIO3<URI> & MonadTask3<URI>;
/**
 * Like `readerTaskEither` but `ap` is sequential
 * @since 2.0.0
 */
export declare const readerTaskEitherSeq: typeof readerTaskEither;
