import { IUser } from '../dtos/IUser'

export class User implements IUser {
    public id?: number | undefined
    public firstName: string
    public lastName: string
    public age: number
    public streetAddress: string
    public emailAddress: string
    public password: string

    constructor (props?: User) {
      if (props) {
        Object.assign(this, props)
      }
    }
}
