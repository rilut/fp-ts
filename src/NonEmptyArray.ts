/**
 * @file Data structure which represents non-empty arrays
 */
import { Monad1 } from './Monad.ts'
import * as A from './Array.ts'
import { Comonad1 } from './Comonad.ts'
import { FunctorWithIndex1 } from './FunctorWithIndex.ts'
import { TraversableWithIndex1 } from './TraversableWithIndex.ts'
import { FoldableWithIndex1 } from './FoldableWithIndex.ts'
import { Ord } from './Ord.ts'
import { getMeetSemigroup, getJoinSemigroup, Semigroup } from './Semigroup.ts'
import { Option, some, none } from './Option.ts'
import { Eq } from './Eq.ts'
import { Predicate, Refinement } from './function.ts'
import { Show } from './Show.ts'

declare module './HKT' {
  interface URI2HKT<A> {
    NonEmptyArray: NonEmptyArray<A>
  }
}

/**
 * @since 2.0.0
 */
export const URI = 'NonEmptyArray.ts'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @since 2.0.0
 */
export interface NonEmptyArray<A> extends Array<A> {
  0: A
  map<B>(f: (a: A, index: number, nea: NonEmptyArray<A>) => B): NonEmptyArray<B>
  concat(as: Array<A>): NonEmptyArray<A>
}

/**
 * Builds a `NonEmptyArray` from a provably (compile time) non empty `Array`.
 *
 * @since 2.0.0
 */
export function make<A>(as: Array<A> & { 0: A }): NonEmptyArray<A> {
  return as as any
}

/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/lib/NonEmptyArray.ts'
 *
 * assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
 *
 * @since 2.0.0
 */
export const cons: <A>(head: A, tail: Array<A>) => NonEmptyArray<A> = A.cons

/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/lib/NonEmptyArray.ts'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @since 2.0.0
 */
export const snoc: <A>(init: Array<A>, end: A) => NonEmptyArray<A> = A.snoc

/**
 * Builds a `NonEmptyArray` from an `Array` returning `none` if `as` is an empty array
 *
 * @since 2.0.0
 */
export function fromArray<A>(as: Array<A>): Option<NonEmptyArray<A>> {
  return as.length > 0 ? some(as as any) : none
}

/**
 * @since 2.0.0
 */
export function getShow<A>(S: Show<A>): Show<NonEmptyArray<A>> {
  const SA = A.getShow(S)
  return {
    show: arr => `make(${SA.show(arr)})`
  }
}

/**
 * @since 2.0.0
 */
export function head<A>(nea: NonEmptyArray<A>): A {
  return nea[0]
}

/**
 * @since 2.0.0
 */
export function tail<A>(nea: NonEmptyArray<A>): Array<A> {
  return nea.slice(1)
}

/**
 * @since 2.0.0
 */
export const reverse: <A>(nea: NonEmptyArray<A>) => NonEmptyArray<A> = A.reverse as any

/**
 * @since 2.0.0
 */
export function min<A>(ord: Ord<A>): (nea: NonEmptyArray<A>) => A {
  const S = getMeetSemigroup(ord)
  return nea => nea.reduce(S.concat)
}

/**
 * @since 2.0.0
 */
export function max<A>(ord: Ord<A>): (nea: NonEmptyArray<A>) => A {
  const S = getJoinSemigroup(ord)
  return nea => nea.reduce(S.concat)
}

/**
 * Builds a `Semigroup` instance for `NonEmptyArray`
 *
 * @since 2.0.0
 */
export function getSemigroup<A = never>(): Semigroup<NonEmptyArray<A>> {
  return {
    concat: (x, y) => x.concat(y)
  }
}

/**
 * @example
 * import { make, getEq, cons } from 'fp-ts/lib/NonEmptyArray.ts'
 * import { eqNumber } from 'fp-ts/lib/Eq.ts'
 *
 * const E = getEq(eqNumber)
 * assert.strictEqual(E.equals(cons(1, [2]), make([1, 2])), true)
 * assert.strictEqual(E.equals(cons(1, [2]), make([1, 3])), false)
 *
 * @since 2.0.0
 */
export const getEq: <A>(E: Eq<A>) => Eq<NonEmptyArray<A>> = A.getEq

/**
 * Group equal, consecutive elements of an array into non empty arrays.
 *
 * @example
 * import { cons, group } from 'fp-ts/lib/NonEmptyArray.ts'
 * import { ordNumber } from 'fp-ts/lib/Ord.ts'
 *
 * assert.deepStrictEqual(group(ordNumber)([1, 2, 1, 1]), [
 *   cons(1, []),
 *   cons(2, []),
 *   cons(1, [1])
 * ])
 *
 * @since 2.0.0
 */
export function group<A>(E: Eq<A>): (as: Array<A>) => Array<NonEmptyArray<A>> {
  return as => {
    const len = as.length
    if (len === 0) {
      return A.empty
    }
    const r: Array<NonEmptyArray<A>> = []
    let head: A = as[0]
    let nea = make([head])
    for (let i = 1; i < len; i++) {
      const x = as[i]
      if (E.equals(x, head)) {
        nea.push(x)
      } else {
        r.push(nea)
        head = x
        nea = make([head])
      }
    }
    r.push(nea)
    return r
  }
}

/**
 * Sort and then group the elements of an array into non empty arrays.
 *
 * @example
 * import { cons, groupSort } from 'fp-ts/lib/NonEmptyArray.ts'
 * import { ordNumber } from 'fp-ts/lib/Ord.ts'
 *
 * assert.deepStrictEqual(groupSort(ordNumber)([1, 2, 1, 1]), [cons(1, [1, 1]), cons(2, [])])
 *
 * @since 2.0.0
 */
export function groupSort<A>(O: Ord<A>): (as: Array<A>) => Array<NonEmptyArray<A>> {
  const sortO = A.sort(O)
  const groupO = group(O)
  return as => groupO(sortO(as))
}

/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { cons, groupBy } from 'fp-ts/lib/NonEmptyArray.ts'
 *
 * assert.deepStrictEqual(groupBy(['foo', 'bar', 'foobar'], a => String(a.length)), {
 *   '3': cons('foo', ['bar']),
 *   '6': cons('foobar', [])
 * })
 *
 * @since 2.0.0
 */
export function groupBy<A>(as: Array<A>, f: (a: A) => string): { [key: string]: NonEmptyArray<A> } {
  const r: { [key: string]: NonEmptyArray<A> } = {}
  for (const a of as) {
    const k = f(a)
    if (r.hasOwnProperty(k)) {
      r[k].push(a)
    } else {
      r[k] = cons(a, [])
    }
  }
  return r
}

/**
 * @since 2.0.0
 */
export function last<A>(nea: NonEmptyArray<A>): A {
  return nea[nea.length - 1]
}

/**
 * @since 2.0.0
 */
export function sort<A>(O: Ord<A>): (nea: NonEmptyArray<A>) => NonEmptyArray<A> {
  return A.sort(O) as any
}

/**
 * @since 2.0.0
 */
export function findFirst<A, B extends A>(nea: NonEmptyArray<A>, refinement: Refinement<A, B>): Option<B>
export function findFirst<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<A>
export function findFirst<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<A> {
  return A.findFirst(nea, predicate)
}

/**
 * @since 2.0.0
 */
export function findLast<A, B extends A>(nea: NonEmptyArray<A>, refinement: Refinement<A, B>): Option<B>
export function findLast<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<A>
export function findLast<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<A> {
  return A.findLast(nea, predicate)
}

/**
 * @since 2.0.0
 */
export function findIndex<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<number> {
  return A.findIndex(nea, predicate)
}

/**
 * @since 2.0.0
 */
export function findLastIndex<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<number> {
  return A.findLastIndex(nea, predicate)
}

/**
 * @since 2.0.0
 */
export function insertAt<A>(i: number, a: A, nea: NonEmptyArray<A>): Option<NonEmptyArray<A>> {
  return A.insertAt(i, a, nea) as any
}

/**
 * @since 2.0.0
 */
export function updateAt<A>(i: number, a: A, nea: NonEmptyArray<A>): Option<NonEmptyArray<A>> {
  return A.updateAt(i, a, nea) as any
}

/**
 * @since 2.0.0
 */
export function modifyAt<A>(i: number, nea: NonEmptyArray<A>, f: (a: A) => A): Option<NonEmptyArray<A>> {
  return A.modifyAt(i, nea, f) as any
}

/**
 * @since 2.0.0
 */
export const copy: <A>(nea: NonEmptyArray<A>) => NonEmptyArray<A> = A.copy as any

/**
 * @since 2.0.0
 */
export function filter<A, B extends A>(nea: NonEmptyArray<A>, refinement: Refinement<A, B>): Option<NonEmptyArray<A>>
export function filter<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<NonEmptyArray<A>>
export function filter<A>(nea: NonEmptyArray<A>, predicate: Predicate<A>): Option<NonEmptyArray<A>> {
  return filterWithIndex(nea, (_, a) => predicate(a))
}

/**
 * @since 2.0.0
 */
export function filterWithIndex<A>(
  nea: NonEmptyArray<A>,
  predicate: (i: number, a: A) => boolean
): Option<NonEmptyArray<A>> {
  return fromArray(nea.filter((a, i) => predicate(i, a)))
}

const mapWithIndex = <A, B>(fa: NonEmptyArray<A>, f: (i: number, a: A) => B): NonEmptyArray<B> => {
  return fa.map((a, i) => f(i, a))
}

/**
 * @since 2.0.0
 */
export const nonEmptyArray: Monad1<URI> &
  Comonad1<URI> &
  TraversableWithIndex1<URI, number> &
  FunctorWithIndex1<URI, number> &
  FoldableWithIndex1<URI, number> = {
  URI,
  map: A.array.map as any,
  mapWithIndex,
  of: A.array.of as any,
  ap: A.array.ap as any,
  chain: A.array.chain as any,
  extend: A.array.extend as any,
  extract: head,
  reduce: A.array.reduce,
  foldMap: A.array.foldMap,
  reduceRight: A.array.reduceRight,
  traverse: A.array.traverse as any,
  sequence: A.array.sequence as any,
  reduceWithIndex: A.array.reduceWithIndex,
  foldMapWithIndex: A.array.foldMapWithIndex,
  reduceRightWithIndex: A.array.reduceRightWithIndex,
  traverseWithIndex: A.array.traverseWithIndex as any
}
