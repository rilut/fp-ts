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
export interface ReaderTaskEither<E, L, A> {
    (e: E): TaskEither<L, A>;
}
/**
 * @since 2.0.0
 */
export declare function run<E, L, A>(ma: ReaderTaskEither<E, L, A>, e: E): Promise<Either<L, A>>;
/**
 * @since 2.0.0
 */
export declare function left<L>(l: L): ReaderTaskEither<unknown, L, never>;
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
export declare function leftTask<L>(ma: Task<L>): ReaderTaskEither<unknown, L, never>;
/**
 * @since 2.0.0
 */
export declare const fromTaskEither: <L, A>(ma: TaskEither<L, A>) => ReaderTaskEither<unknown, L, A>;
/**
 * @since 2.0.0
 */
export declare const rightReader: <E, A>(ma: Reader<E, A>) => ReaderTaskEither<E, never, A>;
/**
 * @since 2.0.0
 */
export declare function leftReader<E, L>(ml: Reader<E, L>): ReaderTaskEither<E, L, never>;
/**
 * @since 2.0.0
 */
export declare function fromIOEither<L, A>(ma: IOEither<L, A>): ReaderTaskEither<unknown, L, A>;
/**
 * @since 2.0.0
 */
export declare function fromEither<L, A>(ma: Either<L, A>): ReaderTaskEither<unknown, L, A>;
/**
 * @since 2.0.0
 */
export declare function fromOption<L, A>(ma: Option<A>, onNone: () => L): ReaderTaskEither<unknown, L, A>;
/**
 * @since 2.0.0
 */
export declare function rightIO<A>(ma: IO<A>): ReaderTaskEither<unknown, never, A>;
/**
 * @since 2.0.0
 */
export declare function leftIO<L>(ml: IO<L>): ReaderTaskEither<unknown, L, never>;
/**
 * @since 2.0.0
 */
export declare function fromPredicate<L, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => L): (a: A) => ReaderTaskEither<unknown, L, B>;
export declare function fromPredicate<L, A>(predicate: Predicate<A>, onFalse: (a: A) => L): (a: A) => ReaderTaskEither<unknown, L, A>;
/**
 * @since 2.0.0
 */
export declare function fold<E, L, A, R>(onLeft: (l: L) => Reader<E, Task<R>>, onRight: (a: A) => Reader<E, Task<R>>): (ma: ReaderTaskEither<E, L, A>) => Reader<E, Task<R>>;
/**
 * @since 2.0.0
 */
export declare function getOrElse<E, L, A>(onLeft: (l: L) => Reader<E, Task<A>>): (ma: ReaderTaskEither<E, L, A>) => Reader<E, Task<A>>;
/**
 * @since 2.0.0
 */
export declare function orElse<E, L, A, M>(f: (l: L) => ReaderTaskEither<E, M, A>): (ma: ReaderTaskEither<E, L, A>) => ReaderTaskEither<E, M, A>;
/**
 * @since 2.0.0
 */
export declare const ask: <E>() => ReaderTaskEither<E, never, E>;
/**
 * @since 2.0.0
 */
export declare const asks: <E, A>(f: (e: E) => A) => ReaderTaskEither<E, never, A>;
/**
 * @since 2.0.0
 */
export declare const local: <D, E>(f: (f: D) => E) => <L, A>(ma: ReaderTaskEither<E, L, A>) => ReaderTaskEither<D, L, A>;
/**
 * @since 2.0.0
 */
export declare const readerTaskEither: Monad3<URI> & Bifunctor3<URI> & Alt3<URI> & MonadIO3<URI> & MonadTask3<URI>;
/**
 * Like `readerTaskEither` but `ap` is sequential
 * @since 2.0.0
 */
export declare const readerTaskEitherSeq: typeof readerTaskEither;
