import * as assert from 'assert.ts'
import { array } from '../src/Array.ts'
import { getFunctorComposition } from '../src/Functor.ts'
import * as option from '../src/Option.ts'

describe('Functor', () => {
  it('getFunctorComposition', () => {
    const arrayOption = getFunctorComposition(array, option.option)
    const double = (a: number) => a * 2
    assert.deepStrictEqual(arrayOption.map([option.some(1)], double), [option.some(2)])
  })
})
