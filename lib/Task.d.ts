/**
 * @file `Task<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.
 * If you want to represent an asynchronous computation that may fail, please see `TaskEither`.
 */
import { Either } from './Either';
import { Lazy } from './function';
import { Monad1 } from './Monad';
import { MonadIO1 } from './MonadIO';
import { MonadTask1 } from './MonadTask';
import { Monoid } from './Monoid';
import { Semigroup } from './Semigroup';
declare module './HKT' {
    interface URI2HKT<A> {
        Task: Task<A>;
    }
}
export declare const URI = "Task";
export declare type URI = typeof URI;
export interface Task<A> {
    (): Promise<A>;
}
/**
 * @since 2.0.0
 */
export declare const getRaceMonoid: <A = never>() => Monoid<Task<A>>;
/**
 * @since 2.0.0
 */
export declare const getSemigroup: <A>(S: Semigroup<A>) => Semigroup<Task<A>>;
/**
 * @since 2.0.0
 */
export declare const getMonoid: <A>(M: Monoid<A>) => Monoid<Task<A>>;
/**
 * @since 2.0.0
 */
export declare const tryCatch: <L, A>(f: Lazy<Promise<A>>, onrejected: (reason: unknown) => L) => Task<Either<L, A>>;
/**
 * @since 2.0.0
 */
export declare function delay<A>(millis: number, ma: Task<A>): Task<A>;
/**
 * @since 2.0.0
 */
export declare const task: Monad1<URI> & MonadIO1<URI> & MonadTask1<URI>;
/**
 * Like `Task` but `ap` is sequential
 *
 * @since 2.0.0
 */
export declare const taskSeq: typeof task;
