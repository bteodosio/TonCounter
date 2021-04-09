import { IUser } from '../dtos/IUser'
import log4js from 'log4js'
import { IUserRepository } from '../repositories/IUserRepository'
import { ErrorHandler } from '@shared/common/ErrorHandler'

export class UserGetter {
    private logger: log4js.Logger
    private dbRepository: IUserRepository

    constructor (dbRepo: IUserRepository) {
      this.logger = log4js.getLogger('Get User')
      this.dbRepository = dbRepo
    }

    public async run (email: string): Promise<IUser> {
      try {
        if (email === '') throw new ErrorHandler(400, 'Email not provided', 'User Register')
        const getParans = {
          TableName: `${process.env.USER_TABLE}`,
          Key: {
            emailAddress: email
          }
        }
        this.logger.info(`Getting user by email ${email}`)
        const gotUser = await this.dbRepository.getUser(getParans)
        this.logger.info(`Got User: ${JSON.stringify(gotUser)}`)
        return gotUser
      } catch (err) {
        this.logger.error(`Fail to get user: ${err.message}`)
        throw new ErrorHandler(err.status, err.message, 'User Register')
      }
    }
}
