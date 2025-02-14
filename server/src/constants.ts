export const GOOGLE_API_USERINFO_ENDPOINT =
  'https://www.googleapis.com/oauth2/v3/userinfo';
export const GOOGLE_API_TOKENINFO_ENDPOINT =
  'https://www.googleapis.com/oauth2/v3/tokeninfo';

export const ID_TOKEN_HTTP_HEADER_NAME = 'x-authentication';

export const PRODUCTION = process.env.NODE_ENV === 'production';

export const LOG_LEVEL = PRODUCTION ? 'error' : 'debug';

export const GRAPHQL_PATH = '/graphql';
