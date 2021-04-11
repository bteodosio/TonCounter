import { APIGatewayProxyHandler } from 'aws-lambda'
import { ErrorHandler } from '@shared/common/ErrorHandler'
import { getUser } from '@modules/user/index'

const handler: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.queryStringParameters) {
      throw new ErrorHandler(400, 'No email information provided', 'Get User')
    }

    const { email } = event.queryStringParameters

    if (!email) {
      throw new ErrorHandler(400, 'No email provided', 'Get User')
    }

    const gotUser = await getUser.run(email)

    return {
      statusCode: 200,
      body: JSON.stringify(gotUser)
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
