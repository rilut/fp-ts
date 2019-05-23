import * as fc from 'fast-check.ts'
import { NonEmptyArray } from '../../src/NonEmptyArray.ts'

/**
 * Returns an `Arbitrary` that yelds a non empty array
 */
export function nonEmptyArray<A>(arb: fc.Arbitrary<A>): fc.Arbitrary<NonEmptyArray<A>> {
  return fc.array(arb, 1, 100) as any
}
