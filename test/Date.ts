import * as assert from 'assert.ts'
import { create, now } from '../src/Date.ts'

describe('Date', () => {
  it('create', () => {
    const d1 = create()
    const m2 = new Date().getTime()
    assert.strictEqual(d1 instanceof Date, true)
    assert.strictEqual(d1.getTime(), m2)
  })

  it('now', () => {
    const m1 = now()
    const m2 = new Date().getTime()
    assert.strictEqual(m1, m2)
  })
})
