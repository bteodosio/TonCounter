import { VisitCounterIncrement } from './service/VisitCounterIncrement'
import { VisitCounterGetter } from './service/VisitCounterGetter'

const visitCounterIncrement = new VisitCounterIncrement()
const visitCounterGetter = new VisitCounterGetter()

export { visitCounterIncrement, visitCounterGetter }
