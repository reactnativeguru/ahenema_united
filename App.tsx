import React from 'react';
import RootNavigation from './src/navigation';
import {Provider as AuthProvider} from './src/context/authContext';
import {Provider as PostProvider} from './src/context/postContext';
import {Provider as CommunityProvider} from './src/context/communityContext';
import {Provider as NavigationProvider} from './src/context/navigationContext';
import {Provider as ChatProvider} from './src/context/chatContext';
import {AuthFirebaseProvider} from './src/context/AuthFirebaseContext';

import Amplify from '@aws-amplify/core';
import config from './src/utils/aws-exports';

Amplify.configure(config);

const App = () => {
  return (
    <NavigationProvider>
      <AuthProvider>
        <PostProvider>
          <CommunityProvider>
            <AuthFirebaseProvider>
              <ChatProvider>
                <RootNavigation />
              </ChatProvider>
            </AuthFirebaseProvider>
          </CommunityProvider>
        </PostProvider>
      </AuthProvider>
    </NavigationProvider>
  );
};

export default App;
