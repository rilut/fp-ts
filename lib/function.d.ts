/**
 * For use with phantom fields
 *
 * @since 2.0.0
 */
export declare const phantom: any;
/**
 * Thunk type
 */
export declare type Lazy<A> = () => A;
export declare type Predicate<A> = (a: A) => boolean;
export declare type Refinement<A, B extends A> = (a: A) => a is B;
export declare type Endomorphism<A> = (a: A) => A;
export declare type BinaryOperation<A, B> = (a1: A, a2: A) => B;
/**
 * @example
 * import { FunctionN } from 'fp-ts/lib/function'
 *
 * export const sum: FunctionN<[number, number], number> = (a, b) => a + b
 *
 * @since 2.0.0
 */
export declare type FunctionN<A extends Array<unknown>, B> = (...args: A) => B;
/**
 * @since 2.0.0
 */
export declare function identity<A>(a: A): A;
/**
 * @since 2.0.0
 */
export declare const unsafeCoerce: <A, B>(a: A) => B;
/**
 * @since 2.0.0
 */
export declare function not<A>(predicate: Predicate<A>): Predicate<A>;
/**
 * @since 2.0.0
 */
export declare function or<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A>;
/**
 * @since 2.0.0
 */
export declare function and<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A>;
/**
 * @since 2.0.0
 */
export declare function constant<A>(a: A): Lazy<A>;
/**
 * A thunk that returns always `true`
 *
 * @since 2.0.0
 */
export declare const constTrue: () => boolean;
/**
 * A thunk that returns always `false`
 *
 * @since 2.0.0
 */
export declare const constFalse: () => boolean;
/**
 * A thunk that returns always `null`
 *
 * @since 2.0.0
 */
export declare const constNull: () => null;
/**
 * A thunk that returns always `undefined`
 *
 * @since 2.0.0
 */
export declare const constUndefined: () => undefined;
/**
 * A thunk that returns always `void`
 *
 * @since 2.0.0
 */
export declare const constVoid: () => void;
/**
 * Flips the order of the arguments of a function of two arguments.
 *
 * @since 2.0.0
 */
export declare function flip<A, B, C>(f: (a: A, b: B) => C): ((b: B, a: A) => C);
/**
 * The `on` function is used to change the domain of a binary operator.
 *
 * @since 2.0.0
 */
export declare function on<A, B, C>(op: BinaryOperation<B, C>, f: (a: A) => B): BinaryOperation<A, C>;
/**
 * @since 2.0.0
 */
export declare function pipe<A, B, C>(ab: (a: A) => B, bc: (b: B) => C): (a: A) => C;
export declare function pipe<A, B, C, D>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): (a: A) => D;
export declare function pipe<A, B, C, D, E>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): (a: A) => E;
export declare function pipe<A, B, C, D, E, F>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F): (a: A) => F;
export declare function pipe<A, B, C, D, E, F, G>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G): (a: A) => G;
export declare function pipe<A, B, C, D, E, F, G, H>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H): (a: A) => H;
export declare function pipe<A, B, C, D, E, F, G, H, I>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I): (a: A) => I;
export declare function pipe<A, B, C, D, E, F, G, H, I, J>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J): (a: A) => J;
/**
 * @since 2.0.0
 */
export declare function tuple<T extends Array<any>>(...t: T): T;
/**
 * @since 2.0.0
 */
export declare function increment(n: number): number;
/**
 * @since 2.0.0
 */
export declare function decrement(n: number): number;
