import { User } from '../../../src/modules/user/entities/User'
import { UserRegister } from '../../../src/modules/user/service/UserRegister'
import { UserGetter } from '../../../src/modules/user/service/UserGetter'
import { MockDB } from './MockDB'
import md5 from 'md5'

describe('Unit test for register an user', () => {
  const mockDB = new MockDB()
  const insertUser = new UserRegister(mockDB)
  const getUser = new UserGetter(mockDB)

  it('Should insert new user when email and password is provided', async (done) => {
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
    const userToInsert = new User()
    try {
      await insertUser.run(userToInsert)
      expect(true).toBe(false)
    } catch (err) {
      expect(err.message).toBe('Email not provided')
    }

    done()
  })

  it('Should throw an error when password is not provided', async (done) => {
    const userToInsert = new User()
    userToInsert.emailAddress = 'emailtest@gmail.com'
    try {
      await insertUser.run(userToInsert)
      expect(true).toBe(false)
    } catch (err) {
      expect(err.message).toBe('Password not provided')
    }

    done()
  })

  it('Should encode new user password when email and password is provided', async (done) => {
    const userToInsert = new User({
      firstName: 'Bruno',
      lastName: 'Teodosio',
      age: 30,
      streetAddress: 'Rua Lídia Borba',
      emailAddress: 'passwordtest@gmail.com',
      password: 'testeSenha'
    })

    const encodedPassword = md5(`${userToInsert.password}_${userToInsert.emailAddress}`)

    await insertUser.run(userToInsert)

    const insertedUser = await getUser.run('passwordtest@gmail.com')

    expect(encodedPassword).toBe(insertedUser.password)
    done()
  })

  it('Should throw an error when email is not valid', async (done) => {
    const userToInsert = new User()
    userToInsert.emailAddress = 'emailtestgmail.com'
    userToInsert.password = 'emailNotValid'
    try {
      await insertUser.run(userToInsert)
      expect(true).toBe(false)
    } catch (err) {
      expect(err.message).toBe('Email not valid')
    }

    done()
  })
})
