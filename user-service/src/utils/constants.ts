export const Constants = {
  API: 'api',
  API_VERSION_1: '1',
  API_VERSION_2: '2',
  API_VERSION_3: '3',
  BAD_REQ: 'Bad request',
  UNAUTH_REQ: 'Unauthorized',
  NOT_FOUND: 'Not found',
  CONFLICT: 'Already exists',
  UPDATE_FAILED: 'Update failed',
  GENERIC_ERROR: 'An error occurred',
  JWT_SECRET: 'com.domain',
  HTTP_200: 200, // ok
  HTTP_201: 201, // created
  HTTP_400: 400, // bad req
  HTTP_401: 401, // Unauthorized
  HTTP_404: 404,
  HTTP_409: 409,
  HTTP_500: 500,
} as const;
