import { ErrorHandler } from '@shared/common/ErrorHandler'
import AWS from 'aws-sdk'
import { IUser } from '../dtos/IUser'
import { User } from '../entities/User'
import { IUserRepository } from '../repositories/IUserRepository'

export class DynamoUserRepository implements IUserRepository {
    private options = {
      region: `${process.env.REGION}`,
      endpoint: `${process.env.ENDPOINT}`
    };

    private dynamoDB: AWS.DynamoDB.DocumentClient

    constructor () {
      this.dynamoDB = process.env.IS_OFFLINE ? new AWS.DynamoDB.DocumentClient(this.options) : new AWS.DynamoDB.DocumentClient()
    }

    public async getUser (keys: AWS.DynamoDB.DocumentClient.GetItemInput): Promise<IUser> {
      try {
        const dbResult = await this.dynamoDB.get(keys).promise()

        const gotUser = new User(dbResult.Item as IUser)

        return gotUser
      } catch (err) {
        throw new ErrorHandler(500, `Fail to get user: ${err.message}`, 'Get User Repository')
      }
    }

    public async addUser (item: AWS.DynamoDB.DocumentClient.PutItemInput): Promise<void> {
      try {
        await this.dynamoDB.put(item).promise()
      } catch (err) {
        throw new ErrorHandler(500, `Fail to save user: ${err.message}`, 'Get User Repository')
      }
    }
}
