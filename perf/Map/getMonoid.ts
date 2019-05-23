import * as Benchmark from 'benchmark.ts'
import { getMonoid } from '../../src/Map.ts'
import { semigroupSum } from '../../src/Semigroup.ts'
import { eqString } from '../../src/Eq.ts'

const suite = new Benchmark.Suite()

const M = getMonoid(eqString, semigroupSum)
const m = new Map([['a', 1]])

suite
  .add('concat', function() {
    M.concat(m, M.empty)
  })
  .on('cycle', function(event: any) {
    // tslint:disable-next-line: no-console
    console.log(String(event.target))
  })
  .on('complete', function(this: any) {
    // tslint:disable-next-line: no-console
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
