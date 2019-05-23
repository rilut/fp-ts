import * as assert from 'assert.ts'
import { random, randomInt, randomBool, randomRange } from '../src/Random.ts'

describe('Random', () => {
  it('random', () => {
    const n = random()
    assert.strictEqual(typeof n, 'number')
  })

  it('randomInt', () => {
    const n = randomInt(0, 10)()
    assert.strictEqual(typeof n, 'number')
    assert.strictEqual(n % 1 === 0, true)
    assert.strictEqual(n >= 0, true)
    assert.strictEqual(n <= 10, true)
  })

  it('randomRange', () => {
    for (let i = 0; i < 10; i++) {
      const n = randomRange(0, 10)()
      assert.strictEqual(typeof n, 'number')
      assert.strictEqual(n >= 0, true)
      assert.strictEqual(n < 10, true)
    }
  })

  it('randomBool', () => {
    const b = randomBool()
    assert.strictEqual(typeof b, 'boolean')
  })
})
