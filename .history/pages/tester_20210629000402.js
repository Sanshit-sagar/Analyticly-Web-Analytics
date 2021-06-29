import React, { useReducer } from 'react';
import { Button, Badge, Card } from '@supabase/ui'
import StackedLayout from '../sections/StackedLayout'

function reducer(state, action) {
  switch(action.type) {
    case 'show_all':
      return {
        ...state,
      };
    case 'increment': 
      const isGoeThanPrevHighest = action.payload.value ? (action.payload.value > state.actionStats.highestAchieved) : false; 
      return {
        ...state,
        counter: state.counter + 1,
        patches: [
            ...state.patches,
            {
                id: state.patches.length + 1,
                type: 'INCREMENT',
                value: 1
            }
        ],
        actionStats: {
            ...state.patches.actionStats,
            numOps: state.actionStats.numOps + 1,
            opsThisSession: state.actionStats.opsThisSession + 1,
            highestAchieved: isGoeThanPrevHighest ? state.actionStats.highestAchieved + 1 : state.actionStats.highestAchieved,
            timeOfLastAction: new Date().getTime().toString(),
        },
      }; 
    case 'decrement':
      return {
        ...state,
        counter: state.counter - 1,
        patches: [
            ...state.patches,
            {
                id: state.patches.length + 1,
                type: 'DECREMENT',
                value: 1
            },
        ],
        actionStats: {
            ...state.patches.actionStats,
            numOps: state.actionStats.numOps + 1,
            opsThisSession: state.actionStats.opsThisSession + 1,
            timeOfLastAction: new Date().getTime().toString(),
        },
      }; 
    case 'reset':
      return {
        ...state,
        counter: 0,
        patches: [
            ...state.patches,
            {
                id: state.patches.length + 1, 
                type: 'RESET',
                value: 0
            },
        ],
        actionStats: {
            ...state.patches.actionStats, 
            numOps: state.actionStats.numOps + 1,
            numSessions: state.actionStats.numSessions + 1, 
            opsThisSession: 1,
            timeOfLastAction: new Date().getTime().toString(),
        }
      }
    default:
      return state; 
  }
}


const Counter = () => {
  const initialState = { 
      counter: 0,
      patches: [
          { id: 0, type: 'INIT', value: '' },
      ],
      actionStats: {
          numOps: 0,
          numSessions: 0, 
          opsThisSession: 0, 
          highestAchieved: 0,
          timeOfLastAction: 0, 
      },
  }; 
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
      <>
        <Badge> 
            <span className="text-md text-black font-extralight"> 
                Count: {JSON.stringify(state)} 
            </span>
        </Badge>
        
        <Button onClick={() => dispatch({ type: "reset" })}> Reset </Button>
        <Button onClick={() => dispatch({ type: "increment" })}> Increment </Button>
        <Button onClick={() => dispatch({ type: "decrement" })}> Decrement </Button>
      </>
  );
}

const TagManager = () => {

  return (
    <StackedLayout pageMeta={{ title: 'Counter', description: 'to test immer' }}>
      <Card title="Counter">
        <Counter /> 
      </Card>
    </StackedLayout>
  )
}

 export default TagManager
 
