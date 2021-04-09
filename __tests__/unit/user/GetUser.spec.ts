import { User } from '../../../src/modules/user/entities/User'
import { UserRegister } from '../../../src/modules/user/service/UserRegister'
import { UserGetter } from '../../../src/modules/user/service/UserGetter'
import { MockDB } from './MockDB'

describe('Unit test for get an user', () => {
  const mockDB = new MockDB()
  const insertUser = new UserRegister(mockDB)
  const getUser = new UserGetter(mockDB)

  it('Should get an existing user when email is provided', async (done) => {
    const userToInsert = new User({
      firstName: 'Bruno',
      lastName: 'Teodosio',
      age: 30,
      streetAddress: 'Rua Lídia Borba',
      emailAddress: 'teodosio.goncalves@gmail.com',
      password: 'OláMundo'
    })

    await insertUser.run(userToInsert)

    const insertedUser = await getUser.run('teodosio.goncalves@gmail.com')

    expect(userToInsert).toMatchObject(insertedUser)
    done()
  })

  it('Should throw an error when email is not provided', async (done) => {
    try {
      await getUser.run('')
      expect(true).toBe(false)
    } catch (err) {
      expect(err.message).toBe('Email not provided')
    }

    done()
  })

  it('Should return empty User when email does not exist', async (done) => {
    const emptyUser = new User()

    const userGot = await getUser.run('emailtest@gmail.com')
    expect(userGot).toMatchObject(emptyUser)

    done()
  })
})
