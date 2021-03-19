import logger from '../logger';
import type { PluginDefinition } from 'apollo-server-core';
import type { GraphQLRequestContext } from 'apollo-server-types';

export const LogPlugin: PluginDefinition = {
  requestDidStart(reqContext: GraphQLRequestContext) {
    logger.debug(
      `Apollo requestDidStart: Query: ${
        reqContext.request?.query
      }, Variables: ${JSON.stringify(reqContext.request?.variables ?? {})}`,
    );
    return {
      didEncounterErrors(reqContext: GraphQLRequestContext) {
        if (reqContext.errors) {
          logger.error(reqContext.errors, `Apollo didEncounterErrors`);
        }
      },
    };
  },
};
