import * as assert from 'assert.ts'
import { io } from '../src/IO.ts'
import { IORef, newIORef } from '../src/IORef.ts'

describe('IORef', () => {
  it('read', () => {
    const ref = new IORef(1)
    assert.strictEqual(ref.read(), 1)
  })

  it('write', () => {
    const ref = new IORef(1)
    assert.strictEqual(io.chain(ref.write(2), () => ref.read)(), 2)
  })

  it('modify', () => {
    const double = (n: number): number => n * 2
    const ref = new IORef(1)
    assert.strictEqual(io.chain(ref.modify(double), () => ref.read)(), 2)
  })

  it('newIORef', () => {
    assert.strictEqual(io.chain(newIORef(1), ref => ref.read)(), 1)
  })
})
