/* eslint-env jest */

import { join } from 'path'
import {
  findPort,
  launchApp,
  killApp,
  nextBuild,
  nextStart,
} from 'next-test-utils'
import webdriver from 'next-webdriver'

let app
let appPort
const appDir = join(__dirname, '../')

const runTests = () => {
  it('should handle router path correctly', async () => {
    const browser = await webdriver(appPort, '/foo/bar/baz')
    expect(await browser.elementByCss('#title').text()).toBe('path:bar')
  })
}

describe('route with middleware and basePath', () => {
  describe('dev mode', () => {
    beforeAll(async () => {
      appPort = await findPort()
      app = await launchApp(appDir, appPort)
    })
    afterAll(() => killApp(app))

    runTests()
  })

  describe('production mode', () => {
    beforeAll(async () => {
      await nextBuild(appDir)
      appPort = await findPort()
      app = await nextStart(appDir, appPort)
    })
    afterAll(() => killApp(app))

    runTests()
  })
})
