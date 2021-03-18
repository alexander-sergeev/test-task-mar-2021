import {
  ApolloClient,
  from,
  fromPromise,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLError } from 'graphql';
import { onError } from '@apollo/client/link/error';
import axios from 'axios';
import { getTokens, setTokens } from '../utils/tokens';
import logger from './logger';

const httpLink = new HttpLink({ uri: '/graphql' });

const authLink = setContext((_, { headers }) => {
  const token = getTokens();
  if (token == null) {
    return {};
  }
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token.access_token}`,
      'x-authentication': token.id_token,
    },
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      logger.error(`GraphQL Error`, graphQLErrors);
    }
    if (networkError) {
      logger.error(`GraphQL Network Error`, networkError.message);
    }
    if (
      graphQLErrors?.some(
        (e: GraphQLError) => e.extensions?.code === 'UNAUTHENTICATED',
      )
    ) {
      logger.info('Refreshing auth tokens');
      return fromPromise(
        axios
          .post('/refreshToken', {
            tokens: getTokens(),
          })
          .then(({ data }) => {
            setTokens(data.credentials);

            const oldHeaders = operation.getContext().headers;
            operation.setContext({
              headers: {
                ...oldHeaders,
                authorization: `Bearer ${data.credentials.access_token}`,
              },
            });
            return true;
          })
          .catch((err) => {
            logger.error(`Erron on refreshing auth tokens`, err.message);
            return false;
          }),
      )
        .filter((value) => Boolean(value))
        .flatMap(() => {
          return forward(operation);
        });
    }
  },
);

const link = from([errorLink, authLink, httpLink]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
