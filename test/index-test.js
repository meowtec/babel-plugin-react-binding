import * as fs from 'fs'
import * as path from 'path'
import * as babel from 'babel-core'

function testFixture (name) {
  const code = fs.readFileSync(
    path.resolve(__dirname, `./fixtures/${name}-actual.js`),
    'utf-8'
  )

  const expectedCode = fs.readFileSync(
    path.resolve(__dirname, `./fixtures/${name}-expected.js`),
    'utf-8'
  )

  const options = require(`./fixtures/${name}-options.json`)

  test(options.$name, () => {
    const result = babel.transform(code, {
      plugins: [[path.resolve(__dirname, '../lib/index.js'), options]],
    })

    /**
     * this step will add semicolons
     */
    const expected = babel.transform(expectedCode, {
      plugins: ['babel-plugin-syntax-jsx'],
    })

    expect(result.code).toBe(expected.code)
  })
}

testFixture('default')
testFixture('customAttr')
