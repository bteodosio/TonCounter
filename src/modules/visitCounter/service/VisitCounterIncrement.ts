import countapi from 'countapi-js'

export class VisitCounterIncrement {
  public async run (counterKey:string): Promise<number> {
    if (counterKey === '') {
      counterKey = 'global'
    }
    const counter = await countapi.visits(counterKey)
    return counter.value
  }
}
