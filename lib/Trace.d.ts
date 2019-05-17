/**
 * @file Adapted from https://github.com/garyb/purescript-debug
 */
/**
 * @since 2.0.0
 */
export declare function spy<A>(a: A): A;
/**
 * @since 2.0.0
 */
export declare function trace<A>(message: (a: A) => unknown): (a: A) => A;
