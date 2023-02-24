import React, {useReducer} from 'react';
import logger from 'use-reducer-logger';

// context function for whole app
export default (reducer, actions, defaultValue) => {
  const Context = React.createContext();

  // provider component wrapping all components
  const Provider = ({children}) => {
    const [state, dispatch] = useReducer(logger(reducer), defaultValue);

    const boundActions = {};

    // action objects looped over and bound to dispatch
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      // bound actions change state
      <Context.Provider value={{state, ...boundActions}}>
        {children}
      </Context.Provider>
    );
  };

  // return context and provider
  return {Context, Provider};
};
