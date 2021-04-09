import { IUser } from '../dtos/IUser'
import log4js from 'log4js'
import { IUserRepository } from '../repositories/IUserRepository'
import { ErrorHandler } from '@shared/common/ErrorHandler'

export class UserRegister {
    private logger: log4js.Logger
    private dbRepository: IUserRepository

    constructor (dbRepo: IUserRepository) {
      this.logger = log4js.getLogger('User Register')
      this.dbRepository = dbRepo
    }

    public async run (user: IUser): Promise<void> {
      try {
        if (!user.emailAddress || user.emailAddress === '') throw new ErrorHandler(400, 'Email not provided', 'User Register')
        const insertParans = {
          TableName: `${process.env.USER_TABLE}`,
          Item: { ...user }
        }

        this.logger.info(`Inserting user with: ${JSON.stringify(insertParans)}`)

        await this.dbRepository.addUser(insertParans)

        this.logger.info(`User ${user.emailAddress} inserted`)
      } catch (err) {
        this.logger.error(`Fail to insert user ${err.message}`)
        throw new ErrorHandler(err.status, err.message, 'User Register')
      }
    }
}
