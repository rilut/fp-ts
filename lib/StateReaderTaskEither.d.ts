import * as RTE from './ReaderTaskEither';
import ReaderTaskEither = RTE.ReaderTaskEither;
import { Monad4 } from './Monad';
import { Either } from './Either';
import { State } from './State';
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
 * @since 2.0.0
 */
export declare function evalState<S, E, L, A>(ma: StateReaderTaskEither<S, E, L, A>, s: S, e: E): Promise<Either<L, A>>;
/**
 * @since 2.0.0
 */
export declare function execState<S, E, L, A>(ma: StateReaderTaskEither<S, E, L, A>, s: S, e: E): Promise<Either<L, S>>;
/**
 * @since 2.0.0
 */
export declare const fromRight: <S, A>(a: A) => StateReaderTaskEither<S, unknown, never, A>;
/**
 * @since 2.0.0
 */
export declare const fromState: <S, A>(ma: State<S, A>) => StateReaderTaskEither<S, unknown, never, A>;
/**
 * @since 2.0.0
 */
export declare const fromReaderTaskEither: <S, E, L, A>(ma: ReaderTaskEither<E, L, A>) => StateReaderTaskEither<S, E, L, A>;
/**
 * @since 2.0.0
 */
export declare const stateReaderTaskEither: Monad4<URI>;
/**
 * Like `stateReaderTaskEither` but `ap` is sequential
 * @since 2.0.0
 */
export declare const stateReaderTaskEitherSeq: typeof stateReaderTaskEither;
