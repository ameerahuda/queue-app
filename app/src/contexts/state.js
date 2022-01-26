import React, { createContext, useReducer } from 'react';
import reducer from './reducer';

export const initialState = {
    pendingJobs: [],
    completedJobs: [],
    cancelledJobs: [],
    size: 0,
    completedSize: 0,
    empty: true,
    workingItem: null,
    workingItemProgress: 0,
};

export const globalState = createContext(initialState);

export const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <globalState.Provider value={{ state, dispatch }}>
            {children}
        </globalState.Provider>
    );
};
