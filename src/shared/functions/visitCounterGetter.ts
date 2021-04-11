import { APIGatewayProxyHandler } from 'aws-lambda'
import { visitCounterGetter } from '@modules/visitCounter'
import { ErrorHandler } from '@shared/common/ErrorHandler'

const handler: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.queryStringParameters) {
      throw new ErrorHandler(400, 'No key provided to get visit', 'Get Visit')
    }

    const { key } = event.queryStringParameters

    if (!key) {
      throw new ErrorHandler(400, 'No key provided to get visit', 'Get Visit')
    }

    const getVisit = await visitCounterGetter.run(key) | 0

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          Visits: `${getVisit}`
        }
      )
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
