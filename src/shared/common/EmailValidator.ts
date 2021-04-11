export class EmailValidator {
  public static isEmail (email:string): boolean {
    const emailRegx = /\S+@\S+\.\S+/
    return emailRegx.test(email)
  }
}
