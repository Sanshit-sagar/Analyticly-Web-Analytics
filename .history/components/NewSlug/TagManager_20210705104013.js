import React, { useState, useContext } from 'react';

import { NewSlugStore } from '../../store'
import { InputElementCardWrapper } from './index'

import { IconActivity, Select, Card, Input, Button, Badge, Typography } from '@supabase/ui'

const TagsList = ({ handleDeletion }) => {
    const state = useContext(NewSlugStore.State)

    return (
        <div 
            className="bg-gray-700 dark:bg-gray-300 text-white dark:text-gray-800 mb-5 p-3 border-white dark:border-black rounded-md"
        >
            <Card>
                {!state.seoTags.length 
                    ?   <Typography.Text> Add tags below to start seeing them here </Typography.Text> 
                    :  <> <Typography.Title level={4}> SEO/UTM tags </Typography.Title> <br /> </>
                }
                <li className="inline-flex justify-start align-start flex-wrap max-w-full">
                    {state.seoTags.map(function(value, index) {
                        return (
                            <ul key={index}>
                                <Badge 
                                    color="pink" 
                                >
                                    {value}
                                    <Button 
                                        onClick={() => {
                                          handleDeletion(index)
                                        }}
                                        style={{ padding: '1px 2px 1px 2px', margin: '3px 2px 2px 5px', backgroundColor: 'green', color: 'white' }}
                                    > 
                                        x
                                    </Button>
                                </Badge> 
                            </ul>
                        )
                    })}
                </li> 
            </Card>
        </div>
    )
}

const TagCategory = ({ category, handleCategoryChange }) => {
  const state = useContext(NewSlugStore.State)

  return (
    <div className="mt-2">
      <Select
        label="Select Tag Category"
        onChange={handleCategoryChange}
        icon={<IconActivity />}
      >
        {Object.entries(state.keysByCategory).map(function(value, index) {
          return (
            <Select.Option 
              key={index}
              value={Object.entries(state.keysByCategory)[index][0]}
            > 
            {Object.entries(state.keysByCategory)[index][0]}
            </Select.Option> 
          ); 
        })}
      </Select>
    </div>
  );
}



const TagKey = ({ category, handleKeyChange }) => {
  const state = useContext(NewSlugStore.State)

  return (
      <Select
        label="Select Tag Key"
        onChange={handleKeyChange}
        icon={<IconActivity />}
      >
        {state.keysByCategory[category].map(function(value, index) {
          return (
            <Select.Option 
              key={index}
              value={state.keysByCategory[category][index]}
            > 
              {state.keysByCategory[category][index]}
            </Select.Option> 
          ); 
        })}
      </Select>
  );
}

const TagValue = ({ handleAddition }) => {
    const [currentValue, setCurrentValue] = useState('')

    const handleUpdate = (event) => {
      setCurrentValue(event.target.value)
    }

    const clearInput = () => {
      setCurrentValue('')
    }

    return (
        <Input 
            label="Tag Value"
            value={currentValue}
            onChange={handleUpdate}
            actions={[
                <Button 
                    onClick={() => {
                        handleAddition(currentValue)
                        clearInput()
                    }}
                    success
                >
                    Add tag
                </Button>,
            ]}
        />
    )
}

const TagManager = () => {
    const [category, setCategory] = useState(state.categories[0])
    const [key, setKey] = useState(state.keysByCategory[category])

    const dispatch = useContext(NewSlugStore.Dispatch)

    const handleAddition = (toAppend) => {
      dispatch({
          type: 'append',
          payload: {
              key: 'seoTags',
              value: `${category}:${key}=${toAppend}`
          }
      }); 
    }

    const handleDeletion = (index) => {
      dispatch({
          type: 'filter',
          payload: {
              key: 'seoTags',
              index: index
          }
      }); 
    }

    const handleKeyChange = (event) => {
      setKey(event.target.value)
    }

    const handleCategoryChange = (event) => {
      setCategory(event.target.value)
    }
   
    return (
        <div className="w-full flex-col justify-start align-stretch">
          <InputElementCardWrapper
              title="SEO/UTM tags"
              description="Select a field for the type and name of tag, and enter the value you want to assign to it"
              children={
                <>
                  <TagsList 
                    handleDeletion={handleDeletion} 
                  /> 
                  <TagCategory
                    category={category}
                    handleCategoryChange={handleCategoryChange}
                  />
                  <TagKey
                    category={category}
                    handleKeyChange={handleKeyChange}
                  />
                  <TagValue 
                    handleAddition={handleAddition} 
                  />

                </>
              }
          />
        </div>
    );
  }
  
   export default TagManager
  