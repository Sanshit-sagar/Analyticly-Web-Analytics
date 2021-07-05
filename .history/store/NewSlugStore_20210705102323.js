import React, {useReducer, createContext} from 'react';

const State = createContext();
const Dispatch = createContext(); 

const reducer = (state, action) => {
    switch(action.type) {
        case 'assign':
            if(state[action.payload.key]===null || state[action.payload.key]===undefined) return state; 
            return {
                ...state,
                [action.payload.key]: action.payload.value
            }; 
        case 'append':
            return {
                ...state,
                [action.payload.key]: [...state[action.payload.key], action.payload.value],
            }; 
        case 'filter':
            return {
                ...state,
                [action.payload.key]: state[action.payload.key].filter(function(value, index) {
                    return index!==action.payload.index; 
                })
            }
        case 'toggle': 
            if(state[action.payload.key]===null || state[action.payload.key]===undefined) return state; 
            return {
                ...state,
                [action.payload.key]: state[action.payload.key] ? false : true,
            };
        default:
            return state
    };
}


const categoryKeyMap = {
    'category1': ['key1', 'key2', 'key3'],
    'cateogry2': ['key4', 'key5', 'key6'],
    'category3': ['key7', 'key8', 'key9'],
}; 
  
  

const initialState = {
    destination: '',
    slug: '',
    title: '', 
    password: '',
    blacklist: [],
    seoTags: [],
    ttl: '',
    routingStatus: 301,
    isSimple: true,
    categories: Object.keys(categoryKeyMap),
    keysByCategory: categoryKeyMap,
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