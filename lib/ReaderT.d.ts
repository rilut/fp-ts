import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT';
import { Monad, Monad1, Monad2, Monad3 } from './Monad';
import { Reader } from './Reader';
export interface ReaderT<M, E, A> {
    (e: E): HKT<M, A>;
}
export interface ReaderM<M> {
    readonly map: <E, A, B>(ma: ReaderT<M, E, A>, f: (a: A) => B) => ReaderT<M, E, B>;
    readonly of: <E, A>(a: A) => ReaderT<M, E, A>;
    readonly ap: <E, A, B>(mab: ReaderT<M, E, (a: A) => B>, ma: ReaderT<M, E, A>) => ReaderT<M, E, B>;
    readonly chain: <E, A, B>(ma: ReaderT<M, E, A>, f: (a: A) => ReaderT<M, E, B>) => ReaderT<M, E, B>;
    readonly ask: <E>() => ReaderT<M, E, E>;
    readonly asks: <E, A>(f: (e: E) => A) => ReaderT<M, E, A>;
    readonly local: <E, A, D>(ma: ReaderT<M, E, A>, f: (d: D) => E) => ReaderT<M, D, A>;
    readonly fromReader: <E, A>(ma: Reader<E, A>) => ReaderT<M, E, A>;
    readonly fromM: <E, A>(ma: HKT<M, A>) => ReaderT<M, E, A>;
}
interface ReaderT1<M extends URIS, E, A> {
    (e: E): Type<M, A>;
}
interface ReaderM1<M extends URIS> {
    readonly map: <E, A, B>(ma: ReaderT1<M, E, A>, f: (a: A) => B) => ReaderT1<M, E, B>;
    readonly of: <E, A>(a: A) => ReaderT1<M, E, A>;
    readonly ap: <E, A, B>(mab: ReaderT1<M, E, (a: A) => B>, ma: ReaderT1<M, E, A>) => ReaderT1<M, E, B>;
    readonly chain: <E, A, B>(ma: ReaderT1<M, E, A>, f: (a: A) => ReaderT1<M, E, B>) => ReaderT1<M, E, B>;
    readonly ask: <E>() => ReaderT1<M, E, E>;
    readonly asks: <E, A>(f: (e: E) => A) => ReaderT1<M, E, A>;
    readonly local: <E, A, D>(ma: ReaderT1<M, E, A>, f: (d: D) => E) => ReaderT1<M, D, A>;
    readonly fromReader: <E, A>(ma: Reader<E, A>) => ReaderT1<M, E, A>;
    readonly fromM: <E, A>(ma: Type<M, A>) => ReaderT1<M, E, A>;
}
interface ReaderT2<M extends URIS2, E, L, A> {
    (e: E): Type2<M, L, A>;
}
interface ReaderM2<M extends URIS2> {
    readonly map: <E, L, A, B>(ma: ReaderT2<M, E, L, A>, f: (a: A) => B) => ReaderT2<M, E, L, B>;
    readonly of: <E, L, A>(a: A) => ReaderT2<M, E, L, A>;
    readonly ap: <E, L, A, B>(mab: ReaderT2<M, E, L, (a: A) => B>, ma: ReaderT2<M, E, L, A>) => ReaderT2<M, E, L, B>;
    readonly chain: <E, L, A, B>(ma: ReaderT2<M, E, L, A>, f: (a: A) => ReaderT2<M, E, L, B>) => ReaderT2<M, E, L, B>;
    readonly ask: <E, L>() => ReaderT2<M, E, L, E>;
    readonly asks: <E, L, A>(f: (e: E) => A) => ReaderT2<M, E, L, A>;
    readonly local: <E, L, A, D>(ma: ReaderT2<M, E, L, A>, f: (d: D) => E) => ReaderT2<M, D, L, A>;
    readonly fromReader: <E, L, A>(ma: Reader<E, A>) => ReaderT2<M, E, L, A>;
    readonly fromM: <E, L, A>(ma: Type2<M, L, A>) => ReaderT2<M, E, L, A>;
}
interface ReaderT3<M extends URIS3, E, U, L, A> {
    (e: E): Type3<M, U, L, A>;
}
interface ReaderM3<M extends URIS3> {
    readonly map: <E, U, L, A, B>(ma: ReaderT3<M, E, U, L, A>, f: (a: A) => B) => ReaderT3<M, E, U, L, B>;
    readonly of: <E, U, L, A>(a: A) => ReaderT3<M, E, U, L, A>;
    readonly ap: <E, U, L, A, B>(mab: ReaderT3<M, E, U, L, (a: A) => B>, ma: ReaderT3<M, E, U, L, A>) => ReaderT3<M, E, U, L, B>;
    readonly chain: <E, U, L, A, B>(ma: ReaderT3<M, E, U, L, A>, f: (a: A) => ReaderT3<M, E, U, L, B>) => ReaderT3<M, E, U, L, B>;
    readonly ask: <E, U, L>() => ReaderT3<M, E, U, L, E>;
    readonly asks: <E, U, L, A>(f: (e: E) => A) => ReaderT3<M, E, U, L, A>;
    readonly local: <E, U, L, A, D>(ma: ReaderT3<M, E, U, L, A>, f: (d: D) => E) => ReaderT3<M, D, U, L, A>;
    readonly fromReader: <E, U, L, A>(ma: Reader<E, A>) => ReaderT3<M, E, U, L, A>;
    readonly fromM: <E, U, L, A>(ma: Type3<M, U, L, A>) => ReaderT3<M, E, U, L, A>;
}
/**
 * @since 2.0.0
 */
export declare function getReaderM<M extends URIS3>(M: Monad3<M>): ReaderM3<M>;
export declare function getReaderM<M extends URIS2>(M: Monad2<M>): ReaderM2<M>;
export declare function getReaderM<M extends URIS>(M: Monad1<M>): ReaderM1<M>;
export declare function getReaderM<M>(M: Monad<M>): ReaderM<M>;
export {};