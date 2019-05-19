import * as RTE from './ReaderTaskEither';
import ReaderTaskEither = RTE.ReaderTaskEither;
import { Monad4 } from './Monad';
import { Either } from './Either';
import { State } from './State';
import { Task } from './Task';
import { TaskEither } from './TaskEither';
import { Reader } from './Reader';
import { IOEither } from './IOEither';
import { Option } from './Option';
import { IO } from './IO';
declare module './HKT' {
    interface URI2HKT4<X, U, L, A> {
        StateReaderTaskEither: StateReaderTaskEither<X, U, L, A>;
    }
}
/**
 * @since 2.0.0
 */
export declare const URI = "StateReaderTaskEither";
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI;
/**
 * @since 2.0.0
 */
export interface StateReaderTaskEither<S, R, E, A> {
    (s: S): ReaderTaskEither<R, E, [A, S]>;
}
/**
 * @since 2.0.0
 */
export declare function run<S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S, r: R): Promise<Either<E, [A, S]>>;
/**
 * Run a computation in the `StateReaderTaskEither` monad, discarding the final state
 *
 * @since 2.0.0
 */
export declare const evalState: <S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S) => ReaderTaskEither<R, E, A>;
/**
 * Run a computation in the `StateReaderTaskEither` monad discarding the result
 *
 * @since 2.0.0
 */
export declare const execState: <S, R, E, A>(ma: StateReaderTaskEither<S, R, E, A>, s: S) => ReaderTaskEither<R, E, S>;
/**
 * @since 2.0.0
 */
export declare function left<S, E>(e: E): StateReaderTaskEither<S, unknown, E, never>;
/**
 * @since 2.0.0
 */
export declare const right: <S, A>(a: A) => StateReaderTaskEither<S, unknown, never, A>;
/**
 * @since 2.0.0
 */
export declare function rightTask<S, A>(ma: Task<A>): StateReaderTaskEither<S, unknown, never, A>;
/**
 * @since 2.0.0
 */
export declare function leftTask<S, E>(me: Task<E>): StateReaderTaskEither<S, unknown, E, never>;
/**
 * @since 2.0.0
 */
export declare function fromTaskEither<S, E, A>(ma: TaskEither<E, A>): StateReaderTaskEither<S, unknown, E, A>;
/**
 * @since 2.0.0
 */
export declare function rightReader<S, R, A>(ma: Reader<R, A>): StateReaderTaskEither<S, R, never, A>;
/**
 * @since 2.0.0
 */
export declare function leftReader<S, R, E>(me: Reader<R, E>): StateReaderTaskEither<S, R, E, never>;
/**
 * @since 2.0.0
 */
export declare function fromIOEither<S, E, A>(ma: IOEither<E, A>): StateReaderTaskEither<S, unknown, E, A>;
/**
 * @since 2.0.0
 */
export declare function fromEither<S, E, A>(ma: Either<E, A>): StateReaderTaskEither<S, unknown, E, A>;
/**
 * @since 2.0.0
 */
export declare function fromOption<S, E, A>(ma: Option<A>, onNone: () => E): StateReaderTaskEither<S, unknown, E, A>;
/**
 * @since 2.0.0
 */
export declare function rightIO<S, A>(ma: IO<A>): StateReaderTaskEither<S, unknown, never, A>;
/**
 * @since 2.0.0
 */
export declare function leftIO<S, E>(me: IO<E>): StateReaderTaskEither<S, unknown, E, never>;
/**
 * @since 2.0.0
 */
export declare const rightState: <S, A>(ma: State<S, A>) => StateReaderTaskEither<S, unknown, never, A>;
/**
 * @since 2.0.0
 */
export declare function leftState<S, E>(me: State<S, E>): StateReaderTaskEither<S, unknown, E, never>;
/**
 * @since 2.0.0
 */
export declare const fromReaderTaskEither: <S, R, E, A>(ma: ReaderTaskEither<R, E, A>) => StateReaderTaskEither<S, R, E, A>;
/**
 * Get the current state
 *
 * @since 2.0.0
 */
export declare const get: <S>() => StateReaderTaskEither<S, unknown, never, S>;
/**
 * Set the state
 *
 * @since 2.0.0
 */
export declare const put: <S>(s: S) => StateReaderTaskEither<S, unknown, never, void>;
/**
 * Modify the state by applying a function to the current state
 *
 * @since 2.0.0
 */
export declare const modify: <S>(f: (s: S) => S) => StateReaderTaskEither<S, unknown, never, void>;
/**
 * Get a value which depends on the current state
 *
 * @since 2.0.0
 */
export declare const gets: <S, A>(f: (s: S) => A) => StateReaderTaskEither<S, unknown, never, A>;
/**
 * @since 2.0.0
 */
export declare const stateReaderTaskEither: Monad4<URI>;
/**
 * Like `stateReaderTaskEither` but `ap` is sequential
 * @since 2.0.0
 */
export declare const stateReaderTaskEitherSeq: typeof stateReaderTaskEither;
