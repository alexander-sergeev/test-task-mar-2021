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
import { getAccessToken, getTokens, setTokens } from '../utils/tokens';

const httpLink = new HttpLink({ uri: '/graphql' });

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  if (token == null) {
    return {};
  }
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (
    graphQLErrors?.some(
      (e: GraphQLError) => e.extensions?.code === 'UNAUTHENTICATED',
    )
  ) {
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
          console.error(err);
          return false;
        }),
    )
      .filter((value) => Boolean(value))
      .flatMap(() => {
        return forward(operation);
      });
  }
});

const link = from([errorLink, authLink, httpLink]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
