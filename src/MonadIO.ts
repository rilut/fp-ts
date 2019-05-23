/**
 * @file Lift a computation from the `IO` monad
 */
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT.ts'
import { IO } from './IO.ts'
import { Monad, Monad1, Monad2, Monad3, Monad2C } from './Monad.ts'

/**
 * @since 2.0.0
 */
export interface MonadIO<M> extends Monad<M> {
  readonly fromIO: <A>(fa: IO<A>) => HKT<M, A>
}

/**
 * @since 2.0.0
 */
export interface MonadIO1<M extends URIS> extends Monad1<M> {
  readonly fromIO: <A>(fa: IO<A>) => Type<M, A>
}

/**
 * @since 2.0.0
 */
export interface MonadIO2<M extends URIS2> extends Monad2<M> {
  readonly fromIO: <L, A>(fa: IO<A>) => Type2<M, L, A>
}

/**
 * @since 2.0.0
 */
export interface MonadIO2C<M extends URIS2, L> extends Monad2C<M, L> {
  readonly fromIO: <A>(fa: IO<A>) => Type2<M, L, A>
}

/**
 * @since 2.0.0
 */
export interface MonadIO3<M extends URIS3> extends Monad3<M> {
  readonly fromIO: <U, L, A>(fa: IO<A>) => Type3<M, U, L, A>
}
