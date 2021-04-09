import AWS from 'aws-sdk'
import { IUserRepository } from '../../../src/modules/user/repositories/IUserRepository'
import { User } from '../../../src/modules/user/entities/User'
import { IUser } from '../../../src/modules/user/dtos/IUser'

export class MockDB implements IUserRepository {
    private user: User[] = []
    public async getUser (keys: AWS.DynamoDB.DocumentClient.GetItemInput): Promise<IUser> {
      const email = keys.Key
      const userFound = new User(this.user.find(user => user.emailAddress === email.emailAddress))

      return userFound
    }

    public async addUser (item: AWS.DynamoDB.DocumentClient.PutItemInput): Promise<void> {
      const userToInsert = new User(item.Item as IUser)

      this.user.push(userToInsert)
    }
}
