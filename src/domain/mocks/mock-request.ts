import { APIGatewayEventDefaultAuthorizerContext, APIGatewayEventRequestContextWithAuthorizer, APIGatewayProxyEvent } from 'aws-lambda'
const context: APIGatewayEventRequestContextWithAuthorizer<APIGatewayEventDefaultAuthorizerContext> = {
  accountId: '',
  apiId: '',
  authorizer: {},
  protocol: '',
  httpMethod: '',
  identity: {
    accessKey: '',
    accountId: '',
    apiKey: '',
    apiKeyId: '',
    caller: null,
    clientCert: null,
    cognitoAuthenticationProvider: null,
    cognitoAuthenticationType: null,
    cognitoIdentityId: null,
    cognitoIdentityPoolId: null,
    principalOrgId: null,
    sourceIp: '',
    user: null,
    userAgent: null,
    userArn: null
  },
  path: '',
  stage: '',
  requestId: '',
  requestTimeEpoch: 0,
  resourceId: '',
  resourcePath: ''
}

export const eventMock: APIGatewayProxyEvent = {
  httpMethod: 'POST',
  path: '/example',
  resource: '/example',
  pathParameters: {},
  headers: {},
  multiValueHeaders: {},
  isBase64Encoded: false,
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  stageVariables: null,
  requestContext: context,
  body: JSON.stringify({
    email: process.env.EMAIL_MOCK,
    userType: 2,
    userId: 9167,
    password: process.env.PASSWORD_MOCK,
    passwordConfirmation: process.env.PASSWORD_MOCK
  })
}
