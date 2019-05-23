import * as assert from 'assert.ts'
import { array } from '../src/Array.ts'
import { getFunctorWithIndexComposition } from '../src/FunctorWithIndex.ts'

describe('FunctorWithIndex', () => {
  it('getFunctorComposition', () => {
    const arrayOfArray = getFunctorWithIndexComposition(array, array)
    const f = ([i, j]: [number, number], a: string) => a + i + j
    assert.deepStrictEqual(arrayOfArray.mapWithIndex([['a', 'b'], ['c', 'd']], f), [['a00', 'b01'], ['c10', 'd11']])
  })
})
