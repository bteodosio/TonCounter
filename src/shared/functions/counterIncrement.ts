import { APIGatewayProxyHandler } from 'aws-lambda'

const handler: APIGatewayProxyHandler = async (event) => {
  try {
    if (event.body && event.body !== '') {
      console.log(event.body)
    }
  } catch (err) {

  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Ton Counter'
      }
    )
  }
}

export { handler }
