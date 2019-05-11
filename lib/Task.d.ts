import { IO } from './IO';
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
/**
 * @since 2.0.0
 */
export declare const URI = "Task";
/**
 * @since 2.0.0
 */
export declare type URI = typeof URI;
/**
 * @since 2.0.0
 */
export interface Task<A> {
    (): Promise<A>;
}
/**
 * @since 2.0.0
 */
export declare const never: Task<never>;
/**
 * @since 2.0.0
 */
export declare function getSemigroup<A>(S: Semigroup<A>): Semigroup<Task<A>>;
/**
 * @since 2.0.0
 */
export declare function getMonoid<A>(M: Monoid<A>): Monoid<Task<A>>;
/**
 * @since 2.0.0
 */
export declare function getRaceMonoid<A = never>(): Monoid<Task<A>>;
/**
 * @since 2.0.0
 */
export declare function delay<A>(millis: number, ma: Task<A>): Task<A>;
/**
 * @since 2.0.0
 */
export declare function fromIO<A>(ma: IO<A>): Task<A>;
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
