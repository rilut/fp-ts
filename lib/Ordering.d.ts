import { Semigroup } from './Semigroup';
import { Eq } from './Eq';
export declare type Ordering = -1 | 0 | 1;
/**
 * @since 2.0.0
 */
export declare const sign: (n: number) => Ordering;
/**
 * @since 2.0.0
 */
export declare const eqOrdering: Eq<Ordering>;
/**
 * @since 2.0.0
 */
export declare const semigroupOrdering: Semigroup<Ordering>;
/**
 * @since 2.0.0
 */
export declare const invert: (O: Ordering) => Ordering;
