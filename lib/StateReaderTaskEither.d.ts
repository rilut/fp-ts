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
export declare const URI = "StateReaderTaskEither";
export declare type URI = typeof URI;
/**
 * @since 2.0.0
 */
export interface StateReaderTaskEither<S, E, L, A> {
    (s: S): ReaderTaskEither<E, L, [A, S]>;
}
/**
 * @since 2.0.0
 */
export declare function run<S, E, L, A>(ma: StateReaderTaskEither<S, E, L, A>, s: S, e: E): Promise<Either<L, [A, S]>>;
/**
 * Run a computation in the `StateReaderTaskEither` monad, discarding the final state
 *
 * @since 2.0.0
 */
export declare const evalState: <S, E, L, A>(ma: StateReaderTaskEither<S, E, L, A>, s: S) => ReaderTaskEither<E, L, A>;
/**
 * Run a computation in the `StateReaderTaskEither` monad discarding the result
 *
 * @since 2.0.0
 */
export declare const execState: <S, E, L, A>(ma: StateReaderTaskEither<S, E, L, A>, s: S) => ReaderTaskEither<E, L, S>;
/**
 * @since 2.0.0
 */
export declare function fromLeft<S, L>(l: L): StateReaderTaskEither<S, unknown, L, never>;
/**
 * @since 2.0.0
 */
export declare const fromRight: <S, A>(a: A) => StateReaderTaskEither<S, unknown, never, A>;
/**
 * @since 2.0.0
 */
export declare function right<S, A>(ma: Task<A>): StateReaderTaskEither<S, unknown, never, A>;
/**
 * @since 2.0.0
 */
export declare function left<S, L>(ma: Task<L>): StateReaderTaskEither<S, unknown, L, never>;
/**
 * @since 2.0.0
 */
export declare function fromTaskEither<S, L, A>(ma: TaskEither<L, A>): StateReaderTaskEither<S, unknown, L, A>;
/**
 * @since 2.0.0
 */
export declare function fromReader<S, E, A>(ma: Reader<E, A>): StateReaderTaskEither<S, E, never, A>;
/**
 * @since 2.0.0
 */
export declare function fromIOEither<S, L, A>(ma: IOEither<L, A>): StateReaderTaskEither<S, unknown, L, A>;
/**
 * @since 2.0.0
 */
export declare function fromEither<S, L, A>(ma: Either<L, A>): StateReaderTaskEither<S, unknown, L, A>;
/**
 * @since 2.0.0
 */
export declare function fromOption<S, L, A>(ma: Option<A>, onNone: () => L): StateReaderTaskEither<S, unknown, L, A>;
/**
 * @since 2.0.0
 */
export declare function fromIO<S, A>(ma: IO<A>): StateReaderTaskEither<S, unknown, never, A>;
/**
 * @since 2.0.0
 */
export declare const fromState: <S, A>(ma: State<S, A>) => StateReaderTaskEither<S, unknown, never, A>;
/**
 * @since 2.0.0
 */
export declare const fromReaderTaskEither: <S, E, L, A>(ma: ReaderTaskEither<E, L, A>) => StateReaderTaskEither<S, E, L, A>;
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
