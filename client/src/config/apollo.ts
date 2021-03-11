import {
  ApolloClient,
  fromPromise,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLError } from 'graphql';
import { onError } from '@apollo/client/link/error';
import axios from 'axios';

const httpLink = new HttpLink({ uri: '/graphql' });

const authLink = setContext((_, { headers }) => {
  const rawTokens = localStorage.getItem('tokens');
  if (rawTokens == null) {
    return {};
  }
  const accessToken = JSON.parse(rawTokens).access_token;
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
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
          tokens: JSON.parse(localStorage.getItem('tokens')!),
        })
        .then(({ data }) => {
          localStorage.setItem('tokens', JSON.stringify(data.credentials));

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

const link = errorLink.concat(authLink).concat(httpLink);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
