import * as assert from 'assert.ts'
import * as E from '../src/Either.ts'
import { getEitherM } from '../src/EitherT.ts'
import { io } from '../src/IO.ts'
import { pipeOp as pipe } from '../src/function.ts'

const T = getEitherM(io)

describe('EitherT', () => {
  it('fold', () => {
    const onLeft = (s: string) => io.of(`left(${s})`)
    const onRight = (n: number) => io.of(`right(${n})`)
    const fold = T.fold(onLeft, onRight)
    assert.strictEqual(fold(io.of(E.right(1)))(), 'right(1)')
    assert.strictEqual(fold(io.of(E.left('bb')))(), 'left(bb)')
  })

  it('getOrElse', () => {
    const onLeft = (s: string) => io.of(`left(${s})`)
    assert.strictEqual(
      pipe(
        io.of(E.right('a')),
        T.getOrElse(onLeft)
      )(),
      'a.ts'
    )
    assert.strictEqual(
      pipe(
        io.of(E.left('bb')),
        T.getOrElse(onLeft)
      )(),
      'left(bb).ts'
    )
  })
})
