import { VisitCounterIncrement } from '../../../src/modules/visitCounter/service/VisitCounterIncrement'
import { VisitCounterGetter } from '../../../src/modules/visitCounter/service/VisitCounterGetter'
describe('Unit test for increase visit counter', () => {
  const visitCounterIncrement = new VisitCounterIncrement()
  const visitCounterGetter = new VisitCounterGetter()

  it('Should increase the number of visist for a key', async (done) => {
    const key = 'unitTest'

    const getVisit = await visitCounterGetter.run(key) | 0
    const increaseVisit = await visitCounterIncrement.run(key)

    expect(increaseVisit).toBe(getVisit + 1)
    done()
  })

  it('Should increase the number of visist for a global when key is not provided', async (done) => {
    const getVisit = await visitCounterGetter.run('global') | 0
    const increaseVisit = await visitCounterIncrement.run('')

    expect(increaseVisit).toBe(getVisit + 1)
    done()
  })
})
