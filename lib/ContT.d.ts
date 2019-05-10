import { HKT, Type, URIS } from './HKT';
import { Monad, Monad1 } from './Monad';
export interface ContT<M, R, A> {
    (c: (a: A) => HKT<M, R>): HKT<M, R>;
}
export interface ContM<M> {
    readonly map: <R, A, B>(ma: ContT<M, R, A>, f: (a: A) => B) => ContT<M, R, B>;
    readonly of: <R, A>(a: A) => ContT<M, R, A>;
    readonly ap: <R, A, B>(mab: ContT<M, R, (a: A) => B>, ma: ContT<M, R, A>) => ContT<M, R, B>;
    readonly chain: <R, A, B>(ma: ContT<M, R, A>, f: (a: A) => ContT<M, R, B>) => ContT<M, R, B>;
    readonly fromM: <R, A>(ma: HKT<M, A>) => ContT<M, R, A>;
}
interface ContT1<M extends URIS, R, A> {
    (c: (a: A) => Type<M, R>): Type<M, R>;
}
interface ContM1<M extends URIS> {
    readonly map: <R, A, B>(ma: ContT1<M, R, A>, f: (a: A) => B) => ContT1<M, R, B>;
    readonly of: <R, A>(a: A) => ContT1<M, R, A>;
    readonly ap: <R, A, B>(mab: ContT1<M, R, (a: A) => B>, ma: ContT1<M, R, A>) => ContT1<M, R, B>;
    readonly chain: <R, A, B>(ma: ContT1<M, R, A>, f: (a: A) => ContT1<M, R, B>) => ContT1<M, R, B>;
    readonly fromM: <R, A>(ma: Type<M, A>) => ContT1<M, R, A>;
}
/**
 * @since 2.0.0
 */
export declare function getContM<M extends URIS>(M: Monad1<M>): ContM1<M>;
export declare function getContM<M>(M: Monad<M>): ContM<M>;
export {};
