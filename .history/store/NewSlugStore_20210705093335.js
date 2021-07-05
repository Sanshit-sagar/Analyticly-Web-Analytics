import React, {useReducer, createContext} from 'react';

const State = createContext();
const Dispatch = createContext(); 

const reducer = (state, action) => {
    switch(action.type) {
        case 'update_password':
            return {
                ...state,
                password: action.payload.value
            };
        case 'assignment':
            return {
                ...state,
                [action.payload.key]: action.payload.value
            }; 
        case 'toggle': 
            return {
                ...state,
                flag: state.flag ? false : true,
            };
        default:
            return state
    };
}

const initialState = {
    password: '',
    flag: false,
};

export const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState); 
    
    return (
        <State.Provider value={state}>
            <Dispatch.Provider value={dispatch}>
                { children }
            </Dispatch.Provider>
        </State.Provider>
    );
}

export const NewSlugStore = {
    State,
    Dispatch,
    Provider,
};