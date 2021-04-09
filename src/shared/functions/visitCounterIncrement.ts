import { APIGatewayProxyHandler } from 'aws-lambda'
import { visitCounterIncrement } from '@modules/visitCounter'
import { ErrorHandler } from '@shared/common/ErrorHandler'

const handler: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.queryStringParameters) {
      throw new ErrorHandler(400, 'No key provided to increase visit', 'Increment Visit')
    }

    const { key } = event.queryStringParameters

    if (!key) {
      throw new ErrorHandler(400, 'No key provided to increase visit', 'Increment Visit')
    }

    const increaseVisit = await visitCounterIncrement.run(key)
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          Visitas: `${increaseVisit}`
        }
      )
    }
  } catch (err) {
    return {
      statusCode: 500,
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
