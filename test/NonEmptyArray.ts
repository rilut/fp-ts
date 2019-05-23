import * as assert from 'assert.ts'
import * as C from '../src/Const.ts'
import { eqNumber } from '../src/Eq.ts'
import { identity } from '../src/function.ts'
import * as I from '../src/Identity.ts'
import { fold, monoidString, monoidSum } from '../src/Monoid.ts'
import {
  cons,
  copy,
  filter,
  filterWithIndex,
  findFirst,
  findIndex,
  findLast,
  findLastIndex,
  fromArray,
  make,
  getEq,
  getSemigroup,
  getShow,
  group,
  groupBy,
  groupSort,
  head,
  insertAt,
  last,
  max,
  min,
  modifyAt,
  nonEmptyArray,
  reverse,
  snoc,
  sort,
  tail,
  updateAt
} from '../src/NonEmptyArray.ts'
import { isSome, none, option, some } from '../src/Option.ts'
import { ordNumber } from '../src/Ord.ts'
import { showString } from '../src/Show.ts'

describe.only('NonEmptyArray', () => {
  it('head', () => {
    const x = make([1, 2])
    assert.deepStrictEqual(head(x), 1)
  })

  it('tail', () => {
    const x = make([1, 2])
    assert.deepStrictEqual(tail(x), [2])
  })

  it('concat', () => {
    const x = make([1, 2])
    const y = make([3, 4])
    assert.deepStrictEqual(x.concat(y), [1, 2, 3, 4])
  })

  it('map', () => {
    const x = make([1, 2])
    const double = (n: number) => n * 2
    assert.deepStrictEqual(nonEmptyArray.map(x, double), [2, 4])
  })

  it('mapWithIndex', () => {
    const x = make([1, 2])
    const add = (i: number, n: number) => n + i
    assert.deepStrictEqual(nonEmptyArray.mapWithIndex(x, add), [1, 3])
  })

  it('of', () => {
    assert.deepStrictEqual(nonEmptyArray.of(1), make([1]))
  })

  it('ap', () => {
    const x = make([1, 2])
    const double = (n: number) => n * 2
    assert.deepStrictEqual(nonEmptyArray.ap(make([double, double]), x), [2, 4, 2, 4])
  })

  it('chain', () => {
    const x = make([1, 2])
    const f = (a: number) => make([a, 4])
    assert.deepStrictEqual(nonEmptyArray.chain(x, f), [1, 4, 2, 4])
  })

  it('extend', () => {
    const sum = fold(monoidSum)
    assert.deepStrictEqual(nonEmptyArray.extend(make([1, 2, 3, 4]), sum), make([10, 9, 7, 4]))
  })

  it('extract', () => {
    assert.strictEqual(nonEmptyArray.extract(make([1, 2, 3])), 1)
  })

  it('traverse', () => {
    assert.deepStrictEqual(
      nonEmptyArray.traverse(option)(make([1, 2, 3]), n => (n >= 0 ? some(n) : none)),
      some(make([1, 2, 3]))
    )
    assert.deepStrictEqual(nonEmptyArray.traverse(option)(make([1, 2, 3]), n => (n >= 2 ? some(n) : none)), none)
  })

  it('sequence', () => {
    const sequence = nonEmptyArray.sequence(option)
    const x1 = make([some(1), some(2), some(3)])
    assert.deepStrictEqual(sequence(x1), some(make([1, 2, 3])))
    const x2 = make([none, some(2), some(3)])
    assert.deepStrictEqual(sequence(x2), none)
  })

  it('min', () => {
    assert.deepStrictEqual(min(ordNumber)(make([2, 1, 3])), 1)
    assert.deepStrictEqual(min(ordNumber)(make([3])), 3)
  })

  it('max', () => {
    assert.deepStrictEqual(max(ordNumber)(make([1, 2, 3])), 3)
    assert.deepStrictEqual(max(ordNumber)(make([1])), 1)
  })

  it('reduce', () => {
    const x = make(['a', 'b'])
    assert.strictEqual(nonEmptyArray.reduce(x, '', (b, a) => b + a), 'ab')
  })

  it('foldMap', () => {
    const foldMap = nonEmptyArray.foldMap(monoidString)
    const x1 = make(['a', 'b', 'c'])
    const f1 = identity
    assert.strictEqual(foldMap(x1, f1), 'abc')
  })

  it('reduceRight', () => {
    const reduceRight = nonEmptyArray.reduceRight
    const x1 = make(['a', 'b', 'c'])
    const init1 = '.ts'
    const f1 = (a: string, acc: string) => acc + a
    assert.strictEqual(reduceRight(x1, init1, f1), 'cba')
  })

  it('fromArray', () => {
    assert.deepStrictEqual(fromArray([]), none)
    assert.deepStrictEqual(fromArray([1]), some(make([1])))
    assert.deepStrictEqual(fromArray([1, 2]), some(make([1, 2])))
  })

  it('getSemigroup', () => {
    const S = getSemigroup<number>()
    assert.deepStrictEqual(S.concat(make([1]), make([2])), make([1, 2]))
    assert.deepStrictEqual(S.concat(make([1, 2]), make([3, 4])), make([1, 2, 3, 4]))
  })

  it('getEq', () => {
    const S = getEq(eqNumber)
    assert.strictEqual(S.equals(make([1]), make([1])), true)
    assert.strictEqual(S.equals(make([1]), make([1, 2])), false)
  })

  it('group', () => {
    assert.deepStrictEqual(group(ordNumber)([]), [])

    assert.deepStrictEqual(group(ordNumber)([1, 2, 1, 1]), [make([1]), make([2]), make([1, 1])])

    assert.deepStrictEqual(group(ordNumber)([1, 2, 1, 1, 3]), [make([1]), make([2]), make([1, 1]), make([3])])
  })

  it('groupSort', () => {
    assert.deepStrictEqual(groupSort(ordNumber)([]), [])
    assert.deepStrictEqual(groupSort(ordNumber)([1, 2, 1, 1]), [make([1, 1, 1]), make([2])])
  })

  it('last', () => {
    assert.deepStrictEqual(last(make([1, 2, 3])), 3)
    assert.deepStrictEqual(last(make([1])), 1)
  })

  it('sort', () => {
    assert.deepStrictEqual(sort(ordNumber)(make([3, 2, 1])), make([1, 2, 3]))
  })

  it('reverse', () => {
    const result = reverse(make([1, 2, 3]))
    const expected = make([3, 2, 1])
    assert.deepStrictEqual(result, expected)
  })

  it('groupBy', () => {
    assert.deepStrictEqual(groupBy([], _ => ''), {})
    assert.deepStrictEqual(groupBy([1], String), { '1': make([1]) })
    assert.deepStrictEqual(groupBy(['foo', 'bar', 'foobar'], a => String(a.length)), {
      '3': make(['foo', 'bar']),
      '6': make(['foobar'])
    })
  })

  it('findFirst', () => {
    const make2 = (x: number) => ({ x })
    const a1 = make2(1)
    const a2 = make2(1)
    const a3 = make2(2)
    const arr = make([a1, a2, a3])
    assert.deepStrictEqual(option.map(findFirst(arr, ({ x }) => x === 1), x => x === a1), some(true))
    assert.deepStrictEqual(findFirst(arr, ({ x }) => x === 2), some(a3))
    assert.deepStrictEqual(findFirst(arr, ({ x }) => x === 10), none)
  })

  it('findLast', () => {
    const make2 = (x: number) => ({ x })
    const a1 = make2(1)
    const a2 = make2(1)
    const a3 = make2(2)
    const arr = make([a1, a2, a3])
    assert.deepStrictEqual(option.map(findLast(arr, ({ x }) => x === 1), x => x === a2), some(true))
    assert.deepStrictEqual(findLast(arr, ({ x }) => x === 2), some(a3))
    assert.deepStrictEqual(findLast(arr, ({ x }) => x === 10), none)
  })

  it('findIndex', () => {
    const make2 = (x: number) => ({ x })
    const a1 = make2(1)
    const a2 = make2(1)
    const a3 = make2(2)
    const arr = make([a1, a2, a3])
    assert.deepStrictEqual(findIndex(arr, ({ x }) => x === 1), some(0))
    assert.deepStrictEqual(findIndex(arr, ({ x }) => x === 2), some(2))
    assert.deepStrictEqual(findIndex(arr, ({ x }) => x === 10), none)
  })

  it('findLastIndex', () => {
    const make2 = (x: number) => ({ x })
    const a1 = make2(1)
    const a2 = make2(1)
    const a3 = make2(2)
    const arr = make([a1, a2, a3])
    assert.deepStrictEqual(findLastIndex(arr, ({ x }) => x === 1), some(1))
    assert.deepStrictEqual(findLastIndex(arr, ({ x }) => x === 2), some(2))
    assert.deepStrictEqual(findLastIndex(arr, ({ x }) => x === 10), none)
  })

  it('insertAt', () => {
    const make2 = (x: number) => ({ x })
    const a1 = make2(1)
    const a2 = make2(1)
    const a3 = make2(2)
    const a4 = make2(3)
    const arr = make([a1, a2, a3])
    assert.deepStrictEqual(insertAt(0, a4, arr), some(make([a4, a1, a2, a3])))
    assert.deepStrictEqual(insertAt(-1, a4, arr), none)
    assert.deepStrictEqual(insertAt(3, a4, arr), some(make([a1, a2, a3, a4])))
    assert.deepStrictEqual(insertAt(1, a4, arr), some(make([a1, a4, a2, a3])))
    assert.deepStrictEqual(insertAt(4, a4, arr), none)
  })

  it('updateAt', () => {
    const make2 = (x: number) => ({ x })
    const a1 = make2(1)
    const a2 = make2(1)
    const a3 = make2(2)
    const a4 = make2(3)
    const arr = make([a1, a2, a3])
    assert.deepStrictEqual(updateAt(0, a4, arr), some(make([a4, a2, a3])))
    assert.deepStrictEqual(updateAt(-1, a4, arr), none)
    assert.deepStrictEqual(updateAt(3, a4, arr), none)
    assert.deepStrictEqual(updateAt(1, a4, arr), some(make([a1, a4, a3])))
    // should return the same reference if nothing changed
    const r1 = updateAt(0, a1, arr)
    if (isSome(r1)) {
      assert.strictEqual(r1.value, arr)
    } else {
      assert.fail('is not a Some')
    }
    const r2 = updateAt(2, a3, arr)
    if (isSome(r2)) {
      assert.strictEqual(r2.value, arr)
    } else {
      assert.fail('is not a Some')
    }
  })

  it('modifyAt', () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(modifyAt(1, cons(1, []), double), none)
    assert.deepStrictEqual(modifyAt(1, cons(1, [2]), double), some(cons(1, [4])))
  })

  it('copy', () => {
    const nea1 = cons(1, [])
    const nea2 = copy(nea1)
    assert.deepStrictEqual(nea2, nea1)
    assert.strictEqual(nea2 === nea1, false)
  })

  it('filter', () => {
    const make2 = (x: number) => ({ x })
    const a1 = make2(1)
    const a2 = make2(1)
    const a3 = make2(2)
    const arr = make([a1, a2, a3])
    assert.deepStrictEqual(filter(arr, ({ x }) => x !== 1), some(make([a3])))
    assert.deepStrictEqual(filter(arr, ({ x }) => x !== 2), some(make([a1, a2])))
    assert.deepStrictEqual(
      filter(arr, ({ x }) => {
        return !(x === 1 || x === 2)
      }),
      none
    )
    assert.deepStrictEqual(filter(arr, ({ x }) => x !== 10), some(make([a1, a2, a3])))

    // refinements
    const actual1 = filter(make([some(3), some(2), some(1)]), isSome)
    assert.deepStrictEqual(actual1, some(make([some(3), some(2), some(1)])))
    const actual2 = filter(make([some(3), none, some(1)]), isSome)
    assert.deepStrictEqual(actual2, some(make([some(3), some(1)])))
  })

  it('filterWithIndex', () => {
    assert.deepStrictEqual(filterWithIndex(make([1, 2, 3]), i => i % 2 === 0), some(make([1, 3])))
    assert.deepStrictEqual(filterWithIndex(make([1, 2, 3]), (i, a) => i % 2 === 1 && a > 2), none)
  })

  it('reduceWithIndex', () => {
    assert.deepStrictEqual(nonEmptyArray.reduceWithIndex(make(['a', 'b']), '', (i, b, a) => b + i + a), '0a1b')
  })

  it('foldMapWithIndex', () => {
    assert.deepStrictEqual(nonEmptyArray.foldMapWithIndex(monoidString)(make(['a', 'b']), (i, a) => i + a), '0a1b')
  })

  it('reduceRightWithIndex', () => {
    assert.deepStrictEqual(nonEmptyArray.reduceRightWithIndex(make(['a', 'b']), '', (i, a, b) => b + i + a), '1b0a')
  })

  it('traverseWithIndex', () => {
    const ta = make(['a', 'bb'])
    assert.deepStrictEqual(
      nonEmptyArray.traverseWithIndex(option)(ta, (i, s) => (s.length >= 1 ? some(s + i) : none)),
      some(make(['a0', 'bb1']))
    )
    assert.deepStrictEqual(
      nonEmptyArray.traverseWithIndex(option)(ta, (i, s) => (s.length > 1 ? some(s + i) : none)),
      none
    )

    // FoldableWithIndex compatibility
    const M = monoidString
    const f = (i: number, s: string): string => s + i
    assert.deepStrictEqual(
      nonEmptyArray.foldMapWithIndex(M)(ta, f),
      nonEmptyArray.traverseWithIndex(C.getApplicative(M))(ta, (i, a) => C.make(f(i, a)))
    )

    // FunctorWithIndex compatibility
    assert.deepStrictEqual(
      nonEmptyArray.mapWithIndex(ta, f),
      nonEmptyArray.traverseWithIndex(I.identity)(ta, (i, a) => I.identity.of(f(i, a)))
    )
  })

  it('cons', () => {
    assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
  })

  it('snoc', () => {
    assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
  })

  it('getShow', () => {
    const S = getShow(showString)
    assert.strictEqual(S.show(make(['a'])), `make(["a"])`)
    assert.strictEqual(S.show(make(['a', 'b', 'c'])), `make(["a", "b", "c"])`)
  })
})
