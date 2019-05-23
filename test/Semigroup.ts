import * as assert from 'assert.ts'
import { monoidString } from '../src/Monoid.ts'
import { ordNumber } from '../src/Ord.ts'
import {
  fold,
  getFirstSemigroup,
  getJoinSemigroup,
  getMeetSemigroup,
  getObjectSemigroup,
  getTupleSemigroup,
  semigroupAll,
  semigroupProduct,
  semigroupString,
  semigroupSum,
  semigroupVoid,
  getDualSemigroup
} from '../src/Semigroup.ts'

describe('Semigroup', () => {
  it('getTupleSemigroup', () => {
    const S1 = getTupleSemigroup(semigroupString, semigroupSum)
    assert.deepStrictEqual(S1.concat(['a', 1], ['b', 2]), ['ab', 3])
    const S2 = getTupleSemigroup(semigroupString, semigroupSum, semigroupAll)
    assert.deepStrictEqual(S2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
  })

  it('fold', () => {
    assert.strictEqual(fold(monoidString)('', ['a', 'b', 'c']), 'abc')
  })

  it('getMeetSemigroup', () => {
    assert.strictEqual(getMeetSemigroup(ordNumber).concat(1, 2), 1)
  })

  it('getJoinSemigroup', () => {
    assert.strictEqual(getJoinSemigroup(ordNumber).concat(1, 2), 2)
  })

  it('getObjectSemigroup', () => {
    type T = {
      foo?: number
      bar: string
    }
    const foo: T = {
      foo: 123,
      bar: '456.ts'
    }
    const bar: T = {
      bar: '123.ts'
    }
    const S = getObjectSemigroup<T>()
    const result = S.concat(foo, bar)
    const expected = Object.assign({}, foo, bar)
    assert.strictEqual(result.foo, expected.foo)
    assert.strictEqual(result.bar, expected.bar)
  })

  it('semigroupProduct', () => {
    assert.strictEqual(semigroupProduct.concat(2, 3), 6)
  })

  it('getFirstSemigroup', () => {
    assert.deepStrictEqual(getFirstSemigroup<number>().concat(1, 2), 1)
  })

  it('semigroupVoid', () => {
    assert.deepStrictEqual(semigroupVoid.concat(undefined, undefined), undefined)
  })

  it('getDualSemigroup', () => {
    const S = getDualSemigroup(semigroupString)
    assert.deepStrictEqual(S.concat('a', 'b'), 'ba')
  })
})
