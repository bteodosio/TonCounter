import { APIGatewayProxyHandler } from 'aws-lambda'
import { ErrorHandler } from '@shared/common/ErrorHandler'
import { User } from '@modules/user/entities/User'
import { insertUser } from '@modules/user/index'

const handler: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.body) {
      throw new ErrorHandler(400, 'No user information provided', 'User Register')
    }

    const newUser = new User(JSON.parse(event.body))

    await insertUser.run(newUser)

    return {
      statusCode: 201,
      body: JSON.stringify(newUser)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode,
      body: JSON.stringify(
        {
          code: err.statusCode,
          message: 'Wrong request',
          description: err.message
        }
      )
    }
  }
}

export { handler }
