import { Alt3 } from './Alt';
import { Bifunctor3 } from './Bifunctor';
import { Either } from './Either';
import { Predicate, Refinement } from './function';
import { IOEither } from './IOEither';
import { Monad3 } from './Monad';
import { MonadIO3 } from './MonadIO';
import { MonadTask3 } from './MonadTask';
import { MonadThrow3 } from './MonadThrow';
import { Reader } from './Reader';
import { Task } from './Task';
import * as TE from './TaskEither';
import TaskEither = TE.TaskEither;
import { Option } from './Option';
import { IO } from './IO';
declare module './HKT' {
    interface URI2HKT3<U, L, A> {
        ReaderTaskEither: ReaderTaskEither<U, L, A>;
    }
}
export declare const URI = "ReaderTaskEither";
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
export declare function fold<E, L, A, R>(ma: ReaderTaskEither<E, L, A>, onLeft: (l: L) => R, onRight: (a: A) => R): Reader<E, Task<R>>;
/**
 * @since 2.0.0
 */
export declare function orElse<E, L, A, M>(ma: ReaderTaskEither<E, L, A>, f: (l: L) => ReaderTaskEither<E, M, A>): ReaderTaskEither<E, M, A>;
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
export declare const local: <E, L, A, D>(ma: ReaderTaskEither<E, L, A>, f: (f: D) => E) => ReaderTaskEither<D, L, A>;
/**
 * @since 2.0.0
 */
export declare const readerTaskEither: Monad3<URI> & Bifunctor3<URI> & Alt3<URI> & MonadIO3<URI> & MonadTask3<URI> & MonadThrow3<URI>;
/**
 * Like `readerTaskEither` but `ap` is sequential
 * @since 2.0.0
 */
export declare const readerTaskEitherSeq: typeof readerTaskEither;
