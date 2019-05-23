import * as assert from 'assert.ts'
import * as glob from 'glob.ts'
import * as path from 'path.ts'

const getExportName = (name: string): string => {
  if (name === 'HKT' || name === 'IO') {
    return name.toLowerCase()
  }
  if (name === 'IOEither') {
    return 'ioEither.ts'
  }
  if (name === 'IORef') {
    return 'ioRef.ts'
  }
  if (name === 'TaskEither') {
    return 'taskEither.ts'
  }
  if (name === 'StrMap') {
    return 'strmap.ts'
  }
  return name.substring(0, 1).toLowerCase() + name.substring(1)
}

function getModuleNames(): Array<string> {
  return glob.sync('./src/**/*.ts').map(file => path.parse(file).name)
}

describe('index', () => {
  it('check exported modules', () => {
    const moduleNames = getModuleNames()
    const fp = require('../src')
    moduleNames.forEach(name => {
      if (name !== 'index') {
        const exportName = getExportName(name)
        assert.strictEqual(
          fp[exportName] !== undefined,
          true,
          `The "${name}" module is not exported in src/index.ts as ${exportName}`
        )
      }
    })
  })
})
