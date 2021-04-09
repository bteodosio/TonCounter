import countapi from 'countapi-js'

export class VisitCounterGetter {
  public async run (counterKey:string): Promise<number> {
    if (counterKey === '') {
      counterKey = 'global'
    }
    const visit = await countapi.get('null', counterKey)
    return visit.value
  }
}
