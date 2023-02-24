import React from 'react';

import 'react-native-gesture-handler';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
} from '@apollo/react-hooks';
import {WebSocketLink} from '@apollo/client/link/ws';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import {getMainDefinition} from '@apollo/client/utilities';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

console.disableYellowBox = false;
const AhenemaUnited = ({isHeadless}) => {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    console.log('App launched by iOS in background. Ignore it!');
    return null;
  }
  const httpLink = new HttpLink({
    uri: 'https://civil-heron-74.hasura.app/v1/graphql',
    headers: {
      'x-hasura-admin-secret':
        'qj65GD0a8Llxe4PDSzbNAYbZZq2CgwZfITMCvtnCjZFFIdHYEmxUL1E9xoiKuKtH', //TODO react native environment
      Authorization: `Bearer ${'token'}`,
    },
  });

  const wsLink = new WebSocketLink(
    new SubscriptionClient('wss://civil-heron-74.hasura.app/v1/graphql', {
      reconnect: true,
      timeout: 30000,
      connectionParams: {
        headers: {
          'x-hasura-admin-secret':
            'qj65GD0a8Llxe4PDSzbNAYbZZq2CgwZfITMCvtnCjZFFIdHYEmxUL1E9xoiKuKtH', //TODO react native environment
          Authorization: `Bearer ${'token'}`,
        },
      },
    }),
  );

  // split link for subscription and query operations
  const splitLink = split(
    ({query}) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const client = new ApolloClient({
    cache: new InMemoryCache({
      merge: true,
    }),

    headers: {
      Authorization: `Bearer ${'token'}`,
    },
    link: splitLink,
  });

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

AppRegistry.registerComponent(appName, () => AhenemaUnited);
