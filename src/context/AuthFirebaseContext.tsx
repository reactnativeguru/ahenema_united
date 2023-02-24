import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthFirebaseContext = createContext({});

export const AuthFirebaseProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthFirebaseContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            //  flexconsole.log(e);
            console.warn({AuthFirebaseContext: e});
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.warn({createUserWithEmailAndPassword: e});
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        },
      }}>
      {children}
    </AuthFirebaseContext.Provider>
  );
};
