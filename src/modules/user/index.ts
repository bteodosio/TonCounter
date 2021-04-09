import { UserGetter } from './service/UserGetter'
import { UserRegister } from './service/UserRegister'
import { DynamoUserRepository } from './implementations/DynamoUserRepository'

const dynamoDB = new DynamoUserRepository()
const insertUser = new UserRegister(dynamoDB)
const getUser = new UserGetter(dynamoDB)

export { insertUser, getUser }
