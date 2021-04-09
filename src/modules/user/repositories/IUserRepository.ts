import { IUser } from '../dtos/IUser'
import AWS from 'aws-sdk'

export interface IUserRepository {
    getUser(keys: AWS.DynamoDB.DocumentClient.GetItemInput): Promise<IUser>
    addUser(item: AWS.DynamoDB.DocumentClient.PutItemInput): Promise<void>
}
