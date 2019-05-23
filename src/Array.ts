/**
 * @file Adapted from https://github.com/purescript/purescript-arrays
 */
import { Alternative1 } from './Alternative.ts'
import { Applicative } from './Applicative.ts'
import { Compactable1, Separated } from './Compactable.ts'
import { Either } from './Either.ts'
import { Extend1 } from './Extend.ts'
import { FilterableWithIndex1 } from './FilterableWithIndex.ts'
import { Foldable1 } from './Foldable.ts'
import { FoldableWithIndex1 } from './FoldableWithIndex.ts'
import { Endomorphism, identity, Predicate, Refinement, tuple, constTrue } from './function.ts'
import { FunctorWithIndex1 } from './FunctorWithIndex.ts'
import { HKT } from './HKT.ts'
import { Monad1 } from './Monad.ts'
import { Monoid } from './Monoid.ts'
import { NonEmptyArray } from './NonEmptyArray.ts'
import { none, Option, some, isSome } from './Option.ts'
import { fromCompare, getSemigroup, Ord, ordNumber } from './Ord.ts'
import { Plus1 } from './Plus.ts'
import { Eq, fromEquals } from './Eq.ts'
import { Show } from './Show.ts'
import { TraversableWithIndex1 } from './TraversableWithIndex.ts'
import { Unfoldable1 } from './Unfoldable.ts'
import { Witherable1 } from './Witherable.ts'

declare module './HKT' {
  interface URI2HKT<A> {
    Array: Array<A>
  }
}

export const URI = 'Array.ts'

export type URI = typeof URI

/**
 * @since 2.0.0
 */
export function getShow<A>(S: Show<A>): Show<Array<A>> {
  return {
    show: as => `[${as.map(S.show).join(', ')}]`
  }
}

const concat = <A>(x: Array<A>, y: Array<A>): Array<A> => {
  const lenx = x.length
  if (lenx === 0) {
    return y
  }
  const leny = y.length
  if (leny === 0) {
    return x
  }
  const r = Array(lenx + leny)
  for (let i = 0; i < lenx; i++) {
    r[i] = x[i]
  }
  for (let i = 0; i < leny; i++) {
    r[i + lenx] = y[i]
  }
  return r
}

/**
 * Returns a `Monoid` for `Array<A>`
 *
 * @example
 * import { getMonoid } from 'fp-ts/lib/Array.ts'
 *
 * const M = getMonoid<number>()
 * assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
 *
 * @since 2.0.0
 */
export function getMonoid<A = never>(): Monoid<Array<A>> {
  return {
    concat,
    empty
  }
}

/**
 * Derives an `Eq` over the `Array` of a given element type from the `Eq` of that type. The derived `Eq` defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
 * different lengths, the result is non equality.
 *
 * @example
 * import { eqString } from 'fp-ts/lib/Eq.ts'
 * import { getEq } from 'fp-ts/lib/Array.ts'
 *
 * const E = getEq(eqString)
 * assert.strictEqual(E.equals(['a', 'b'], ['a', 'b']), true)
 * assert.strictEqual(E.equals(['a'], []), false)
 *
 * @since 2.0.0
 */
export function getEq<A>(E: Eq<A>): Eq<Array<A>> {
  return fromEquals((xs, ys) => xs.length === ys.length && xs.every((x, i) => E.equals(x, ys[i])))
}

/**
 * Derives an `Ord` over the `Array` of a given element type from the `Ord` of that type. The ordering between two such
 * arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order, in
 * case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
 * the same length, the result is equality.
 *
 * @example
 * import { getOrd } from 'fp-ts/lib/Array.ts'
 * import { ordString } from 'fp-ts/lib/Ord.ts'
 *
 * const O = getOrd(ordString)
 * assert.strictEqual(O.compare(['b'], ['a']), 1)
 * assert.strictEqual(O.compare(['a'], ['a']), 0)
 * assert.strictEqual(O.compare(['a'], ['b']), -1)
 *
 *
 * @since 2.0.0
 */
export function getOrd<A>(O: Ord<A>): Ord<Array<A>> {
  return fromCompare((a, b) => {
    const aLen = a.length
    const bLen = b.length
    const len = Math.min(aLen, bLen)
    for (let i = 0; i < len; i++) {
      const ordering = O.compare(a[i], b[i])
      if (ordering !== 0) {
        return ordering
      }
    }
    return ordNumber.compare(aLen, bLen)
  })
}

/**
 * An empty array
 *
 * @since 2.0.0
 */
export const empty: Array<never> = []

const zero = <A>(): Array<A> => empty

const unfold = <A, B>(b: B, f: (b: B) => Option<[A, B]>): Array<A> => {
  const ret: Array<A> = []
  let bb = b
  while (true) {
    const mt = f(bb)
    if (isSome(mt)) {
      const [a, b] = mt.value
      ret.push(a)
      bb = b
    } else {
      break
    }
  }
  return ret
}

/**
 * Return a list of length `n` with element `i` initialized with `f(i)`
 *
 * @example
 * import { makeBy } from 'fp-ts/lib/Array.ts'
 *
 * const double = (n: number): number => n * 2
 * assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
 *
 * @since 2.0.0
 */
export function makeBy<A>(n: number, f: (i: number) => A): Array<A> {
  const r: Array<A> = []
  for (let i = 0; i < n; i++) {
    r.push(f(i))
  }
  return r
}

/**
 * Create an array containing a range of integers, including both endpoints
 *
 * @example
 * import { range } from 'fp-ts/lib/Array.ts'
 *
 * assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
 *
 * @since 2.0.0
 */
export function range(start: number, end: number): Array<number> {
  return makeBy(end - start + 1, i => start + i)
}

/**
 * Create an array containing a value repeated the specified number of times
 *
 * @example
 * import { replicate } from 'fp-ts/lib/Array.ts'
 *
 * assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
 *
 * @since 2.0.0
 */
export function replicate<A>(n: number, a: A): Array<A> {
  return makeBy(n, () => a)
}

/**
 * Removes one level of nesting
 *
 * @example
 * import { flatten } from 'fp-ts/lib/Array.ts'
 *
 * assert.deepStrictEqual(flatten([[1], [2], [3]]), [1, 2, 3])
 *
 * @since 2.0.0
 */
export function flatten<A>(mma: Array<Array<A>>): Array<A> {
  let rLen = 0
  const len = mma.length
  for (let i = 0; i < len; i++) {
    rLen += mma[i].length
  }
  const r = Array(rLen)
  let start = 0
  for (let i = 0; i < len; i++) {
    const arr = mma[i]
    const l = arr.length
    for (let j = 0; j < l; j++) {
      r[j + start] = arr[j]
    }
    start += l
  }
  return r
}

/**
 * Break an array into its first element and remaining elements
 *
 * @example
 * import { fold } from 'fp-ts/lib/Array.ts'
 *
 * const len = <A>(as: Array<A>): number => fold(as, () => 0, (_, tail) => 1 + len(tail))
 * assert.strictEqual(len([1, 2, 3]), 3)
 *
 * @since 2.0.0
 */
export function fold<A, B>(as: Array<A>, onNil: () => B, onCons: (head: A, tail: Array<A>) => B): B {
  return isEmpty(as) ? onNil() : onCons(as[0], as.slice(1))
}

/**
 * Break an array into its initial elements and the last element
 *
 * @since 2.0.0
 */
export function foldRight<A, B>(as: Array<A>, onNil: () => B, onCons: (init: Array<A>, last: A) => B): B {
  return isEmpty(as) ? onNil() : onCons(as.slice(0, as.length - 1), as[as.length - 1])
}

/**
 * Same as `reduce` but it carries over the intermediate steps
 *
 * ```ts
 * import { scan } from 'fp-ts/lib/Array.ts'
 *
 * assert.deepStrictEqual(scan([1, 2, 3], 10, (b, a) => b - a), [ 10, 9, 7, 4 ])
 * ```
 *
 * @since 2.0.0
 */
export function scan<A, B>(as: Array<A>, b: B, f: (b: B, a: A) => B): Array<B> {
  const l = as.length
  const r: Array<B> = new Array(l + 1)
  r[0] = b
  for (let i = 0; i < l; i++) {
    r[i + 1] = f(r[i], as[i])
  }
  return r
}

/**
 * Fold an array from the right, keeping all intermediate results instead of only the final result
 *
 * @example
 * import { scanRight } from 'fp-ts/lib/Array.ts'
 *
 * assert.deepStrictEqual(scanRight([1, 2, 3], 10, (a, b) => b - a), [ 4, 5, 7, 10 ])
 *
 * @since 2.0.0
 */
export function scanRight<A, B>(as: Array<A>, b: B, f: (a: A, b: B) => B): Array<B> {
  const l = as.length
  const r: Array<B> = new Array(l + 1)
  r[l] = b
  for (let i = l - 1; i >= 0; i--) {
    r[i] = f(as[i], r[i + 1])
  }
  return r
}

/**
 * Test whether an array is empty
 *
 * @example
 * import { isEmpty } from 'fp-ts/lib/Array.ts'
 *
 * assert.strictEqual(isEmpty([]), true)
 *
 * @since 2.0.0
 */
export function isEmpty<A>(as: Array<A>): boolean {
  return as.length === 0
}

/**
 * Test whether an array contains a particular index
 *
 * @since 2.0.0
 */
export function isOutOfBound<A>(i: number, as: Array<A>): boolean {
  return i < 0 || i >= as.length
}

/**
 * This function provides a safe way to read a value at a particular index from an array
 *
 * @example
 * import { lookup } from 'fp-ts/lib/Array.ts'
 * import { some, none } from 'fp-ts/lib/Option.ts'
 *
 * assert.deepStrictEqual(lookup(1, [1, 2, 3]), some(2))
 * assert.deepStrictEqual(lookup(3, [1, 2, 3]), none)
 *
 * @since 2.0.0
 */
export function lookup<A>(i: number, as: Array<A>): Option<A> {
  return isOutOfBound(i, as) ? none : some(as[i])
}

/**
 * Attaches an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/lib/Array.ts'
 *
 * assert.deepStrictEqual(cons(0, [1, 2, 3]), [0, 1, 2, 3])
 *
 * @since 2.0.0
 */
export function cons<A>(head: A, tail: Array<A>): NonEmptyArray<A> {
  const len = tail.length
  const r = Array(len + 1)
  for (let i = 0; i < len; i++) {
    r[i + 1] = tail[i]
  }
  r[0] = head
  return r as NonEmptyArray<A>
}

/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/lib/Array.ts'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @since 2.0.0
 */
export function snoc<A>(init: Array<A>, end: A): NonEmptyArray<A> {
  const len = init.length
  const r = Array(len + 1)
  for (let i = 0; i < len; i++) {
    r[i] = init[i]
  }
  r[len] = end
  return r as NonEmptyArray<A>
}

/**
 * Get the first element in an array, or `None` if the array is empty
 *
 * @example
 * import { head } from 'fp-ts/lib/Array.ts'
 * import { some, none } from 'fp-ts/lib/Option.ts'
 *
 * assert.deepStrictEqual(head([1, 2, 3]), some(1))
 * assert.deepStrictEqual(head([]), none)
 *
 * @since 2.0.0
 */
export function head<A>(as: Array<A>): Option<A> {
  return isEmpty(as) ? none : some(as[0])
}

/**
 * Get the last element in an array, or `None` if the array is empty
 *
 * @example
 * import { last } from 'fp-ts/lib/Array.ts'
 * import { some, none } from 'fp-ts/lib/Option.ts'
 *
 * assert.deepStrictEqual(last([1, 2, 3]), some(3))
 * assert.deepStrictEqual(last([]), none)
 *
 * @since 2.0.0
 */
export function last<A>(as: Array<A>): Option<A> {
  return lookup(as.length - 1, as)
}

/**
 * Get all but the first element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { tail } from 'fp-ts/lib/Array.ts'
 * import { some, none } from 'fp-ts/lib/Option.ts'
 *
 * assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(tail([]), none)
 *
 * @since 2.0.0
 */
export function tail<A>(as: Array<A>): Option<Array<A>> {
  return isEmpty(as) ? none : some(as.slice(1))
}

/**
 * Get all but the last element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { init } from 'fp-ts/lib/Array.ts'
 * import { some, none } from 'fp-ts/lib/Option.ts'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
 * assert.deepStrictEqual(init([]), none)
 *
 * @since 2.0.0
 */
export function init<A>(as: Array<A>): Option<Array<A>> {
  const len = as.length
  return len === 0 ? none : some(as.slice(0, len - 1))
}

/**
 * Keep only a number of elements from the start of an array, creating a new array.
 * `n` must be a natural number
 *
 * @example
 * import { take } from 'fp-ts/lib/Array.ts'
 *
 * assert.deepStrictEqual(take(2, [1, 2, 3]), [1, 2])
 *
 * @since 2.0.0
 */
export function take<A>(n: number, as: Array<A>): Array<A> {
  return as.slice(0, n)
}

/**
 * Keep only a number of elements from the end of an array, creating a new array.
 * `n` must be a natural number
 *
 * @example
 * import { takeRight } from 'fp-ts/lib/Array.ts'
 *
 * assert.deepStrictEqual(takeRight(2, [1, 2, 3, 4, 5]), [4, 5])
 *
 * @since 2.0.0
 */
export function takeRight<A>(n: number, as: Array<A>): Array<A> {
  return n === 0 ? empty : as.slice(-n)
}

/**
 * Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new array
 *
 * @example
 * import { takeWhile } from 'fp-ts/lib/Array.ts'
 *
 * assert.deepStrictEqual(takeWhile([2, 4, 3, 6], n => n % 2 === 0), [2, 4])
 *
 * @since 2.0.0
 */
export function takeWhile<A, B extends A>(as: Array<A>, refinement: Refinement<A, B>): Array<B>
export function takeWhile<A>(as: Array<A>, predicate: Predicate<A>): Array<A>
export function takeWhile<A>(as: Array<A>, predicate: Predicate<A>): Array<A> {
  const i = spanIndexUncurry(as, predicate)
  const init = Array(i)
  for (let j = 0; j < i; j++) {
    init[j] = as[j]
  }
  return init
}

const spanIndexUncurry = <A>(as: Array<A>, predicate: Predicate<A>): number => {
  const l = as.length
  let i = 0
  for (; i < l; i++) {
    if (!predicate(as[i])) {
      break
    }
  }
  return i
}

/**
 * Split an array into two parts:
 * 1. the longest initial subarray for which all elements satisfy the specified predicate
 * 2. the remaining elements
 *
 * @example
 * import { span } from 'fp-ts/lib/Array.ts'
 *
 * assert.deepStrictEqual(span([1, 3, 2, 4, 5], n => n % 2 === 1), { init: [1, 3], rest: [2, 4, 5] })
 *
 * @since 2.0.0
 */
export function span<A, B extends A>(as: Array<A>, refinement: Refinement<A, B>): { init: Array<B>; rest: Array<A> }
export function span<A>(as: Array<A>, predicate: Predicate<A>): { init: Array<A>; rest: Array<A> }
export function span<A>(as: Array<A>, predicate: Predicate<A>): { init: Array<A>; rest: Array<A> } {
  const i = spanIndexUncurry(as, predicate)
  const init = Array(i)
  for (let j = 0; j < i; j++) {
    init[j] = as[j]
  }
  const l = as.length
  const rest = Array(l - i)
  for (let j = i; j < l; j++) {
    rest[j - i] = as[j]
  }
  return { init, rest }
}

/**
 * Drop a number of elements from the start of an array, creating a new array
 *
 * @example
 * import { drop } from 'fp-ts/lib/Array.ts'
 *
 * assert.deepStrictEqual(drop(2, [1, 2, 3]), [3])
 *
 * @since 2.0.0
 */
export function drop<A>(n: number, as: Array<A>): Array<A> {
  return as.slice(n, as.length)
}

/**
 * Drop a number of elements from the end of an array, creating a new array
 *
 * @example
 * import { dropRight } from 'fp-ts/lib/Array.ts'
 *
 * assert.deepStrictEqual(dropRight(2, [1, 2, 3, 4, 5]), [1, 2, 3])
 *
 * @since 2.0.0
 */
export function dropRight<A>(n: number, as: Array<A>): Array<A> {
  return as.slice(0, as.length - n)
}

/**
 * Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new array
 *
 * @example
 * import { dropWhile } from 'fp-ts/lib/Array.ts'
 *
 * assert.deepStrictEqual(dropWhile([1, 3, 2, 4, 5], n => n % 2 === 1), [2, 4, 5])
 *
 * @since 2.0.0
 */
export function dropWhile<A>(as: Array<A>, predicate: Predicate<A>): Array<A> {
  const i = spanIndexUncurry(as, predicate)
  const l = as.length
  const rest = Array(l - i)
  for (let j = i; j < l; j++) {
    rest[j - i] = as[j]
  }
  return rest
}

/**
 * Find the first index for which a predicate holds
 *
 * @example
 * import { findIndex } from 'fp-ts/lib/Array.ts'
 * import { some, none } from 'fp-ts/lib/Option.ts'
 *
 * assert.deepStrictEqual(findIndex([1, 2, 3], x => x === 2), some(1))
 * assert.deepStrictEqual(findIndex([], x => x === 2), none)
 *
 * @since 2.0.0
 */
export function findIndex<A>(as: Array<A>, predicate: Predicate<A>): Option<number> {
  const len = as.length
  for (let i = 0; i < len; i++) {
    if (predicate(as[i])) {
      return some(i)
    }
  }
  return none
}

/**
 * Find the first element which satisfies a predicate (or a refinement) function
 *
 * @example
 * import { findFirst } from 'fp-ts/lib/Array.ts'
 * import { some } from 'fp-ts/lib/Option.ts'
 *
 * assert.deepStrictEqual(findFirst([{ a: 1, b: 1 }, { a: 1, b: 2 }], x => x.a === 1), some({ a: 1, b: 1 }))
 *
 * @since 2.0.0
 */
export function findFirst<A, B extends A>(as: Array<A>, refinement: Refinement<A, B>): Option<B>
export function findFirst<A>(as: Array<A>, predicate: Predicate<A>): Option<A>
export function findFirst<A>(as: Array<A>, predicate: Predicate<A>): Option<A> {
  const len = as.length
  for (let i = 0; i < len; i++) {
    if (predicate(as[i])) {
      return some(as[i])
    }
  }
  return none
}

/**
 * Find the first element returned by an option based selector function
 *
 * @example
 * import { findFirstMap } from 'fp-ts/lib/Array.ts'
 * import { some, none } from 'fp-ts/lib/Option.ts'
 *
 * interface Person {
 *   name: string
 *   age?: number
 * }
 *
 * const persons: Array<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the first person that has an age
 * assert.deepStrictEqual(findFirstMap(persons, p => (p.age === undefined ? none : some(p.name))), some('Mary'))
 *
 * @since 2.0.0
 */
export function findFirstMap<A, B>(as: Array<A>, f: (a: A) => Option<B>): Option<B> {
  const len = as.length
  for (let i = 0; i < len; i++) {
    const v = f(as[i])
    if (isSome(v)) {
      return v
    }
  }
  return none
}

/**
 * Find the last element which satisfies a predicate function
 *
 * @example
 * import { findLast } from 'fp-ts/lib/Array.ts'
 * import { some } from 'fp-ts/lib/Option.ts'
 *
 * assert.deepStrictEqual(findLast([{ a: 1, b: 1 }, { a: 1, b: 2 }], x => x.a === 1), some({ a: 1, b: 2 }))
 *
 * @since 2.0.0
 */
export function findLast<A, B extends A>(as: Array<A>, refinement: Refinement<A, B>): Option<B>
export function findLast<A>(as: Array<A>, predicate: Predicate<A>): Option<A>
export function findLast<A>(as: Array<A>, predicate: Predicate<A>): Option<A> {
  const len = as.length
  for (let i = len - 1; i >= 0; i--) {
    if (predicate(as[i])) {
      return some(as[i])
    }
  }
  return none
}

/**
 * Find the last element returned by an option based selector function
 *
 * @example
 * import { findLastMap } from 'fp-ts/lib/Array.ts'
 * import { some, none } from 'fp-ts/lib/Option.ts'
 *
 * interface Person {
 *   name: string
 *   age?: number
 * }
 *
 * const persons: Array<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the last person that has an age
 * assert.deepStrictEqual(findLastMap(persons, p => (p.age === undefined ? none : some(p.name))), some('Joey'))
 *
 * @since 2.0.0
 */
export function findLastMap<A, B>(as: Array<A>, f: (a: A) => Option<B>): Option<B> {
  const len = as.length
  for (let i = len - 1; i >= 0; i--) {
    const v = f(as[i])
    if (isSome(v)) {
      return v
    }
  }
  return none
}

/**
 * Returns the index of the last element of the list which matches the predicate
 *
 * @example
 * import { findLastIndex } from 'fp-ts/lib/Array.ts'
 * import { some, none } from 'fp-ts/lib/Option.ts'
 *
 * interface X {
 *   a: number
 *   b: number
 * }
 * const xs: Array<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
 * assert.deepStrictEqual(findLastIndex(xs, x => x.a === 1), some(1))
 * assert.deepStrictEqual(findLastIndex(xs, x => x.a === 4), none)
 *
 *
 * @since 2.0.0
 */
export function findLastIndex<A>(as: Array<A>, predicate: Predicate<A>): Option<number> {
  const len = as.length
  for (let i = len - 1; i >= 0; i--) {
    if (predicate(as[i])) {
      return some(i)
    }
  }
  return none
}

/**
 * @since 2.0.0
 */
export function copy<A>(as: Array<A>): Array<A> {
  const l = as.length
  const r = Array(l)
  for (let i = 0; i < l; i++) {
    r[i] = as[i]
  }
  return r
}

/**
 * @since 2.0.0
 */
export function unsafeInsertAt<A>(i: number, a: A, as: Array<A>): Array<A> {
  const xs = copy(as)
  xs.splice(i, 0, a)
  return xs
}

/**
 * Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { insertAt } from 'fp-ts/lib/Array.ts'
 * import { some } from 'fp-ts/lib/Option.ts'
 *
 * assert.deepStrictEqual(insertAt(2, 5, [1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
 *
 * @since 2.0.0
 */
export function insertAt<A>(i: number, a: A, as: Array<A>): Option<Array<A>> {
  return i < 0 || i > as.length ? none : some(unsafeInsertAt(i, a, as))
}

/**
 * @since 2.0.0
 */
export function unsafeUpdateAt<A>(i: number, a: A, as: Array<A>): Array<A> {
  if (as[i] === a) {
    return as
  } else {
    const xs = copy(as)
    xs[i] = a
    return xs
  }
}

/**
 * Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { updateAt } from 'fp-ts/lib/Array.ts'
 * import { some, none } from 'fp-ts/lib/Option.ts'
 *
 * assert.deepStrictEqual(updateAt(1, 1, [1, 2, 3]), some([1, 1, 3]))
 * assert.deepStrictEqual(updateAt(1, 1, []), none)
 *
 * @since 2.0.0
 */
export function updateAt<A>(i: number, a: A, as: Array<A>): Option<Array<A>> {
  return isOutOfBound(i, as) ? none : some(unsafeUpdateAt(i, a, as))
}

/**
 * @since 2.0.0
 */
export function unsafeDeleteAt<A>(i: number, as: Array<A>): Array<A> {
  const xs = copy(as)
  xs.splice(i, 1)
  return xs
}

/**
 * Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { deleteAt } from 'fp-ts/lib/Array.ts'
 * import { some, none } from 'fp-ts/lib/Option.ts'
 *
 * assert.deepStrictEqual(deleteAt(0, [1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(deleteAt(1, []), none)
 *
 * @since 2.0.0
 */
export function deleteAt<A>(i: number, as: Array<A>): Option<Array<A>> {
  return isOutOfBound(i, as) ? none : some(unsafeDeleteAt(i, as))
}

/**
 * Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
 * of bounds
 *
 * @example
 * import { modifyAt } from 'fp-ts/lib/Array.ts'
 * import { some, none } from 'fp-ts/lib/Option.ts'
 *
 * const double = (x: number): number => x * 2
 * assert.deepStrictEqual(modifyAt(1, [1, 2, 3], double), some([1, 4, 3]))
 * assert.deepStrictEqual(modifyAt(1, [], double), none)
 *
 * @since 2.0.0
 */
export function modifyAt<A>(i: number, as: Array<A>, f: (a: A) => A): Option<Array<A>> {
  return isOutOfBound(i, as) ? none : some(unsafeUpdateAt(i, f(as[i]), as))
}

/**
 * Reverse an array, creating a new array
 *
 * @example
 * import { reverse } from 'fp-ts/lib/Array.ts'
 *
 * assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
 *
 * @since 2.0.0
 */
export function reverse<A>(as: Array<A>): Array<A> {
  return copy(as).reverse()
}

/**
 * Extracts from an array of `Either` all the `Right` elements. All the `Right` elements are extracted in order
 *
 * @example
 * import { rights } from 'fp-ts/lib/Array.ts'
 * import { right, left } from 'fp-ts/lib/Either.ts'
 *
 * assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
 *
 * @since 2.0.0
 */
export function rights<L, A>(as: Array<Either<L, A>>): Array<A> {
  const r: Array<A> = []
  const len = as.length
  for (let i = 0; i < len; i++) {
    const a = as[i]
    if (a._tag === 'Right') {
      r.push(a.right)
    }
  }
  return r
}

/**
 * Extracts from an array of `Either` all the `Left` elements. All the `Left` elements are extracted in order
 *
 * @example
 * import { lefts } from 'fp-ts/lib/Array.ts'
 * import { left, right } from 'fp-ts/lib/Either.ts'
 *
 * assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
 *
 * @since 2.0.0
 */
export function lefts<L, A>(as: Array<Either<L, A>>): Array<L> {
  const r: Array<L> = []
  const len = as.length
  for (let i = 0; i < len; i++) {
    const a = as[i]
    if (a._tag === 'Left') {
      r.push(a.left)
    }
  }
  return r
}

/**
 * Sort the elements of an array in increasing order, creating a new array
 *
 * @example
 * import { sort } from 'fp-ts/lib/Array.ts'
 * import { ordNumber } from 'fp-ts/lib/Ord.ts'
 *
 * assert.deepStrictEqual(sort(ordNumber)([3, 2, 1]), [1, 2, 3])
 *
 * @since 2.0.0
 */
export function sort<A>(O: Ord<A>): (as: Array<A>) => Array<A> {
  return as => copy(as).sort(O.compare)
}

/**
 * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
 * input array is short, excess elements of the longer array are discarded.
 *
 * @example
 * import { zipWith } from 'fp-ts/lib/Array.ts'
 *
 * assert.deepStrictEqual(zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n), ['a1', 'b2', 'c3'])
 *
 * @since 2.0.0
 */
export function zipWith<A, B, C>(fa: Array<A>, fb: Array<B>, f: (a: A, b: B) => C): Array<C> {
  const fc = []
  const len = Math.min(fa.length, fb.length)
  for (let i = 0; i < len; i++) {
    fc[i] = f(fa[i], fb[i])
  }
  return fc
}

/**
 * Takes two arrays and returns an array of corresponding pairs. If one input array is short, excess elements of the
 * longer array are discarded
 *
 * @example
 * import { zip } from 'fp-ts/lib/Array.ts'
 *
 * assert.deepStrictEqual(zip([1, 2, 3], ['a', 'b', 'c', 'd']), [[1, 'a'], [2, 'b'], [3, 'c']])
 *
 * @since 2.0.0
 */
export function zip<A, B>(fa: Array<A>, fb: Array<B>): Array<[A, B]> {
  return zipWith(fa, fb, tuple)
}

/**
 * The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays
 *
 * @example
 * import { unzip } from 'fp-ts/lib/Array.ts'
 *
 * assert.deepStrictEqual(unzip([[1, 'a'], [2, 'b'], [3, 'c']]), [[1, 2, 3], ['a', 'b', 'c']])
 *
 * @since 2.0.0
 */
export function unzip<A, B>(as: Array<[A, B]>): [Array<A>, Array<B>] {
  const fa = []
  const fb = []

  for (let i = 0; i < as.length; i++) {
    fa[i] = as[i][0]
    fb[i] = as[i][1]
  }

  return [fa, fb]
}

/**
 * Rotate an array to the right by `n` steps
 *
 * @example
 * import { rotate } from 'fp-ts/lib/Array.ts'
 *
 * assert.deepStrictEqual(rotate(2, [1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 *
 * @since 2.0.0
 */
export function rotate<A>(n: number, xs: Array<A>): Array<A> {
  const len = xs.length
  if (n === 0 || len <= 1 || len === Math.abs(n)) {
    return xs
  } else if (n < 0) {
    return rotate(len + n, xs)
  } else {
    return xs.slice(-n).concat(xs.slice(0, len - n))
  }
}

/**
 * Test if a value is a member of an array. Takes a `Eq<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `Array<A>`.
 *
 * @example
 * import { elem } from 'fp-ts/lib/Array.ts'
 * import { eqNumber } from 'fp-ts/lib/Eq.ts'
 *
 * assert.strictEqual(elem(eqNumber)(1, [1, 2, 3]), true)
 * assert.strictEqual(elem(eqNumber)(4, [1, 2, 3]), false)
 *
 * @since 2.0.0
 */
export function elem<A>(E: Eq<A>): (a: A, as: Array<A>) => boolean {
  return (a, as) => {
    const predicate = (element: A) => E.equals(element, a)
    let i = 0
    const len = as.length
    for (; i < len; i++) {
      if (predicate(as[i])) {
        return true
      }
    }
    return false
  }
}

/**
 * Remove duplicates from an array, keeping the first occurance of an element.
 *
 * @example
 * import { uniq } from 'fp-ts/lib/Array.ts'
 * import { eqNumber } from 'fp-ts/lib/Eq.ts'
 *
 * assert.deepStrictEqual(uniq(eqNumber)([1, 2, 1]), [1, 2])
 *
 * @since 2.0.0
 */
export function uniq<A>(E: Eq<A>): (as: Array<A>) => Array<A> {
  const elemS = elem(E)
  return as => {
    const r: Array<A> = []
    const len = as.length
    let i = 0
    for (; i < len; i++) {
      const a = as[i]
      if (!elemS(a, r)) {
        r.push(a)
      }
    }
    return len === r.length ? as : r
  }
}

/**
 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
 * etc...
 *
 * @example
 * import { sortBy } from 'fp-ts/lib/Array.ts'
 * import { contramap, ordString, ordNumber } from 'fp-ts/lib/Ord.ts'
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 * const byName = contramap(ordString, (p: Person) => p.name)
 * const byAge = contramap(ordNumber, (p: Person) => p.age)
 *
 * const sortByNameByAge = sortBy([byName, byAge])
 *
 * const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
 * assert.deepStrictEqual(sortByNameByAge(persons), [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 2 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 }
 * ])
 *
 * @since 2.0.0
 */
export function sortBy<A>(ords: Array<Ord<A>>): Endomorphism<Array<A>> {
  return sort(ords.slice(1).reduce(getSemigroup<A>().concat, ords[0]))
}

/**
 * A useful recursion pattern for processing an array to produce a new array, often used for "chopping" up the input
 * array. Typically chop is called with some function that will consume an initial prefix of the array and produce a
 * value and the rest of the array.
 *
 * @example
 * import { Eq, eqNumber } from 'fp-ts/lib/Eq.ts'
 * import { chop, span } from 'fp-ts/lib/Array.ts'
 *
 * const group = <A>(E: Eq<A>) => (as: Array<A>): Array<Array<A>> => {
 *   return chop(as, as => {
 *     const { init, rest } = span(as, a => E.equals(a, as[0]))
 *     return [init, rest]
 *   })
 * }
 * assert.deepStrictEqual(group(eqNumber)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
 *
 * @since 2.0.0
 */
export function chop<A, B>(as: Array<A>, f: (as: Array<A>) => [B, Array<A>]): Array<B> {
  const result: Array<B> = []
  let cs: Array<A> = as
  while (cs.length > 0) {
    const [b, c] = f(cs)
    result.push(b)
    cs = c
  }
  return result
}

/**
 * Splits an array into two pieces, the first piece has `n` elements.
 *
 * @example
 * import { splitAt } from 'fp-ts/lib/Array.ts'
 *
 * assert.deepStrictEqual(splitAt(2, [1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
 *
 * @since 2.0.0
 */
export function splitAt<A>(n: number, as: Array<A>): [Array<A>, Array<A>] {
  return [as.slice(0, n), as.slice(n)]
}

/**
 * Splits an array into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the array. Note that `chunksOf([], n)` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
 * definition of `chunksOf`; it satisfies the property that
 *
 * ```ts
 * chunksOf(xs, n).concat(chunksOf(ys, n)) == chunksOf(xs.concat(ys)), n)
 * ```
 *
 * whenever `n` evenly divides the length of `xs`.
 *
 * @example
 * import { chunksOf } from 'fp-ts/lib/Array.ts'
 *
 * assert.deepStrictEqual(chunksOf(2, [1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
 *
 *
 * @since 2.0.0
 */
export function chunksOf<A>(n: number, as: Array<A>): Array<Array<A>> {
  return isOutOfBound(n - 1, as) ? [as] : chop(as, as => splitAt(n, as))
}

/**
 * Array comprehension
 *
 * ```
 * [ f(x, y, ...) | x ← xs, y ← ys, ..., g(x, y, ...) ]
 * ```
 *
 * @example
 * import { comprehension } from 'fp-ts/lib/Array.ts'
 * import { tuple } from 'fp-ts/lib/function.ts'
 *
 * assert.deepStrictEqual(comprehension([[1, 2, 3], ['a', 'b']], tuple, (a, b) => (a + b.length) % 2 === 0), [
 *   [1, 'a'],
 *   [1, 'b'],
 *   [3, 'a'],
 *   [3, 'b']
 * ])
 *
 * @since 2.0.0
 */
export function comprehension<A, B, C, D, R>(
  input: [Array<A>, Array<B>, Array<C>, Array<D>],
  f: (a: A, b: B, c: C, d: D) => R,
  g?: (a: A, b: B, c: C, d: D) => boolean
): Array<R>
export function comprehension<A, B, C, R>(
  input: [Array<A>, Array<B>, Array<C>],
  f: (a: A, b: B, c: C) => R,
  g?: (a: A, b: B, c: C) => boolean
): Array<R>
export function comprehension<A, R>(input: [Array<A>], f: (a: A) => R, g?: (a: A) => boolean): Array<R>
export function comprehension<A, B, R>(
  input: [Array<A>, Array<B>],
  f: (a: A, b: B) => R,
  g?: (a: A, b: B) => boolean
): Array<R>
export function comprehension<A, R>(input: [Array<A>], f: (a: A) => boolean, g?: (a: A) => R): Array<R>
export function comprehension<R>(
  input: Array<Array<any>>,
  f: (...xs: Array<any>) => R,
  g: (...xs: Array<any>) => boolean = constTrue
): Array<R> {
  const go = (scope: Array<any>, input: Array<Array<any>>): Array<R> => {
    if (input.length === 0) {
      return g(...scope) ? [f(...scope)] : empty
    } else {
      return chain(input[0], x => go(snoc(scope, x), input.slice(1)))
    }
  }
  return go(empty, input)
}

/**
 * Creates an array of unique values, in order, from all given arrays using a `Eq` for equality comparisons
 *
 * @example
 * import { union } from 'fp-ts/lib/Array.ts'
 * import { eqNumber } from 'fp-ts/lib/Eq.ts'
 *
 * assert.deepStrictEqual(union(eqNumber)([1, 2], [2, 3]), [1, 2, 3])
 *
 * @since 2.0.0
 */
export function union<A>(E: Eq<A>): (xs: Array<A>, ys: Array<A>) => Array<A> {
  const elemE = elem(E)
  return (xs, ys) => concat(xs, ys.filter(a => !elemE(a, xs)))
}

/**
 * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 *
 * @example
 * import { intersection } from 'fp-ts/lib/Array.ts'
 * import { eqNumber } from 'fp-ts/lib/Eq.ts'
 *
 * assert.deepStrictEqual(intersection(eqNumber)([1, 2], [2, 3]), [2])
 *
 * @since 2.0.0
 */
export function intersection<A>(E: Eq<A>): (xs: Array<A>, ys: Array<A>) => Array<A> {
  const elemE = elem(E)
  return (xs, ys) => xs.filter(a => elemE(a, ys))
}

/**
 * Creates an array of array values not included in the other given array using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 *
 * @example
 * import { difference } from 'fp-ts/lib/Array.ts'
 * import { eqNumber } from 'fp-ts/lib/Eq.ts'
 *
 * assert.deepStrictEqual(difference(eqNumber)([1, 2], [2, 3]), [1])
 *
 * @since 2.0.0
 */
export function difference<A>(E: Eq<A>): (xs: Array<A>, ys: Array<A>) => Array<A> {
  const elemE = elem(E)
  return (xs, ys) => xs.filter(a => !elemE(a, ys))
}

const map = <A, B>(fa: Array<A>, f: (a: A) => B): Array<B> => {
  return fa.map(a => f(a))
}

const mapWithIndex = <A, B>(fa: Array<A>, f: (index: number, a: A) => B): Array<B> => {
  return fa.map((a, i) => f(i, a))
}

const of = <A>(a: A): Array<A> => {
  return [a]
}

const ap = <A, B>(fab: Array<(a: A) => B>, fa: Array<A>): Array<B> => {
  return flatten(map(fab, f => map(fa, f)))
}

const chain = <A, B>(fa: Array<A>, f: (a: A) => Array<B>): Array<B> => {
  let resLen = 0
  const l = fa.length
  const temp = new Array(l)
  for (let i = 0; i < l; i++) {
    const e = fa[i]
    const arr = f(e)
    resLen += arr.length
    temp[i] = arr
  }
  const r = Array(resLen)
  let start = 0
  for (let i = 0; i < l; i++) {
    const arr = temp[i]
    const l = arr.length
    for (let j = 0; j < l; j++) {
      r[j + start] = arr[j]
    }
    start += l
  }
  return r
}

const reduce = <A, B>(fa: Array<A>, b: B, f: (b: B, a: A) => B): B => {
  return reduceWithIndex(fa, b, (_, b, a) => f(b, a))
}

const foldMap = <M>(M: Monoid<M>): (<A>(fa: Array<A>, f: (a: A) => M) => M) => {
  const foldMapWithIndexM = foldMapWithIndex(M)
  return (fa, f) => foldMapWithIndexM(fa, (_, a) => f(a))
}

const reduceRight = <A, B>(fa: Array<A>, b: B, f: (a: A, b: B) => B): B => {
  return reduceRightWithIndex(fa, b, (_, a, b) => f(a, b))
}

const reduceWithIndex = <A, B>(fa: Array<A>, b: B, f: (i: number, b: B, a: A) => B): B => {
  const l = fa.length
  let r = b
  for (let i = 0; i < l; i++) {
    r = f(i, r, fa[i])
  }
  return r
}

const foldMapWithIndex = <M>(M: Monoid<M>) => <A>(fa: Array<A>, f: (i: number, a: A) => M): M => {
  return fa.reduce((b, a, i) => M.concat(b, f(i, a)), M.empty)
}

const reduceRightWithIndex = <A, B>(fa: Array<A>, b: B, f: (i: number, a: A, b: B) => B): B => {
  return fa.reduceRight((b, a, i) => f(i, a, b), b)
}

function traverse<F>(F: Applicative<F>): <A, B>(ta: Array<A>, f: (a: A) => HKT<F, B>) => HKT<F, Array<B>> {
  const traverseWithIndexF = traverseWithIndex(F)
  return (ta, f) => traverseWithIndexF(ta, (_, a) => f(a))
}

const sequence = <F>(F: Applicative<F>) => <A>(ta: Array<HKT<F, A>>): HKT<F, Array<A>> => {
  return reduce(ta, F.of(zero()), (fas, fa) => F.ap(F.map(fas, as => (a: A) => snoc(as, a)), fa))
}

const compact = <A>(as: Array<Option<A>>): Array<A> => filterMap(as, identity)

const filter = <A>(as: Array<A>, predicate: Predicate<A>): Array<A> => {
  return as.filter(predicate)
}

const filterMap = <A, B>(as: Array<A>, f: (a: A) => Option<B>): Array<B> => {
  return filterMapWithIndex(as, (_, a) => f(a))
}

const partition = <A>(fa: Array<A>, predicate: Predicate<A>): Separated<Array<A>, Array<A>> => {
  return partitionWithIndex(fa, (_, a) => predicate(a))
}

const partitionMap = <A, L, R>(fa: Array<A>, f: (a: A) => Either<L, R>): Separated<Array<L>, Array<R>> => {
  return partitionMapWithIndex(fa, (_, a) => f(a))
}

const separate = <RL, RR>(fa: Array<Either<RL, RR>>): Separated<Array<RL>, Array<RR>> => {
  const left: Array<RL> = []
  const right: Array<RR> = []
  for (const e of fa) {
    if (e._tag === 'Left') {
      left.push(e.left)
    } else {
      right.push(e.right)
    }
  }
  return {
    left,
    right
  }
}

const wither = <F>(F: Applicative<F>): (<A, B>(ta: Array<A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Array<B>>) => {
  const traverseF = traverse(F)
  return (wa, f) => F.map(traverseF(wa, f), compact)
}

const wilt = <F>(
  F: Applicative<F>
): (<RL, RR, A>(wa: Array<A>, f: (a: A) => HKT<F, Either<RL, RR>>) => HKT<F, Separated<Array<RL>, Array<RR>>>) => {
  const traverseF = traverse(F)
  return (wa, f) => F.map(traverseF(wa, f), separate)
}

const traverseWithIndex = <F>(F: Applicative<F>) => <A, B>(
  ta: Array<A>,
  f: (i: number, a: A) => HKT<F, B>
): HKT<F, Array<B>> => {
  return reduceWithIndex(ta, F.of<Array<B>>(zero()), (i, fbs, a) =>
    F.ap(F.map(fbs, bs => (b: B) => snoc(bs, b)), f(i, a))
  )
}

const partitionMapWithIndex = <RL, RR, A>(
  fa: Array<A>,
  f: (i: number, a: A) => Either<RL, RR>
): Separated<Array<RL>, Array<RR>> => {
  const left: Array<RL> = []
  const right: Array<RR> = []
  for (let i = 0; i < fa.length; i++) {
    const e = f(i, fa[i])
    if (e._tag === 'Left') {
      left.push(e.left)
    } else {
      right.push(e.right)
    }
  }
  return {
    left,
    right
  }
}

const partitionWithIndex = <A>(
  fa: Array<A>,
  predicateWithIndex: (i: number, a: A) => boolean
): Separated<Array<A>, Array<A>> => {
  const left: Array<A> = []
  const right: Array<A> = []
  for (let i = 0; i < fa.length; i++) {
    const a = fa[i]
    if (predicateWithIndex(i, a)) {
      right.push(a)
    } else {
      left.push(a)
    }
  }
  return {
    left,
    right
  }
}

const filterMapWithIndex = <A, B>(fa: Array<A>, f: (i: number, a: A) => Option<B>): Array<B> => {
  const result: Array<B> = []
  for (let i = 0; i < fa.length; i++) {
    const optionB = f(i, fa[i])
    if (isSome(optionB)) {
      result.push(optionB.value)
    }
  }
  return result
}

const filterWithIndex = <A>(fa: Array<A>, predicateWithIndex: (i: number, a: A) => boolean): Array<A> => {
  return fa.filter((a, i) => predicateWithIndex(i, a))
}

const extend = <A, B>(fa: Array<A>, f: (fa: Array<A>) => B): Array<B> => {
  return fa.map((_, i, as) => f(as.slice(i)))
}

/**
 * @since 2.0.0
 */
export const array: Monad1<URI> &
  Foldable1<URI> &
  Unfoldable1<URI> &
  TraversableWithIndex1<URI, number> &
  Alternative1<URI> &
  Plus1<URI> &
  Extend1<URI> &
  Compactable1<URI> &
  FilterableWithIndex1<URI, number> &
  Witherable1<URI> &
  FunctorWithIndex1<URI, number> &
  FoldableWithIndex1<URI, number> = {
  URI,
  map,
  mapWithIndex,
  compact,
  separate,
  filter,
  filterMap,
  partition,
  partitionMap,
  of,
  ap,
  chain,
  reduce,
  foldMap,
  reduceRight,
  unfold,
  traverse,
  sequence,
  zero,
  alt: (fx, f) => concat(fx, f()),
  extend,
  wither,
  wilt,
  reduceWithIndex,
  foldMapWithIndex,
  reduceRightWithIndex,
  traverseWithIndex,
  partitionMapWithIndex,
  partitionWithIndex,
  filterMapWithIndex,
  filterWithIndex
}
