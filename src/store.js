import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  posts: [],
  post: {},
  user: {},
  comments: [],
  theme: 'light', 
};

const StoreContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.payload,
      };
    case 'SET_POST':
      return {
        ...state,
        post: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_COMMENTS':
      return {
        ...state,
        comments: action.payload,
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  return (
    <StoreContext.Provider value={{ state, dispatch, toggleTheme }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
