import { VisitCounterGetter } from '../../../src/modules/visitCounter/service/VisitCounterGetter'
describe('Unit test for get visit counter', () => {
  const visitCounterGetter = new VisitCounterGetter()

  it('Should return the number of visist for a key', async (done) => {
    const key = 'unitTest'

    const getVisit = await visitCounterGetter.run(key) | 0

    expect(getVisit).toBeGreaterThan(0)
    done()
  })

  it('Should return the number of visist for global when key is not provided', async (done) => {
    const getVisit = await visitCounterGetter.run('') | 0

    expect(getVisit).toBeGreaterThan(0)
    done()
  })
})
