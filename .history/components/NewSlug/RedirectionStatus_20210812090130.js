import React, { useState, useContext, useRef } from 'react'

import {useRadioGroupState} from '@react-stately/radio';
import {useRadioGroup, useRadio} from '@react-aria/radio'
import {VisuallyHidden} from '@react-aria/visually-hidden';
import {useFocusRing} from '@react-aria/focus';

import { InputElementCardWrapper } from './index'
import { NewSlugStore } from '../../store'
// import { dispatchValidationUpdate } from '../../lib/dispatchers'

let statusItems = [
    {
        code: '301',
        name: 'Moved Permanently',
        permanence: 'Permanent',
        cacheable: 'yes',
        methods: 'GET or POST',
        description: 'redirects permanently from one URL to another passing link equity to the redirected page',
        disabled: false,
        index: 1,
    },
    {
        code: '303',
        name: 'See Other (since HTTP/1.1)',
        permanence: 'Temporary',
        cacheable: 'never',
        methods: 'Always GET',
        description: 'forces a GET request to the new URL even if original request was POST',
        disabled: false,
        index: 3,
    },
    {
        code: '305',
        name: 'Use Proxy (since HTTP/1.1)',
        permanence: '',
        cacheable: '',
        methods: '',
        description: 'The requested resource is available only through a proxy. Wont work in Mozilla and IE.',
        disabled: true,
        index: 4,
    },
    {
        code: '307',
        name: 'Temporary Redirect (since HTTP/1.1)',
        permanence: 'Temporary',
        cacheable: 'not by default',
        methods: 'Mirrors the incoming requests HTTP method',
        description: 'provides a new URL for the browser to resubmit a GET or POST request',
        disabled: false,
        index: 5,
    },
    {
        code: '308',
        name: 'Permanent Redirect (RFC 7538)',
        permanence: 'Permanent',
        cacheable: 'yes, by default',
        methods: 'Mirrors the incoming requests HTTP method',
        description: 'provides a new URL for the browser to resubmit a GET or POST request',
        disabled: false,
        index: 6,
    }
];


let RadioContext = React.createContext(null);

function RadioGroup(props) {
    let {children, label} = props;
    let state = useRadioGroupState(props);
    let {radioGroupProps, labelProps} = useRadioGroup(props, state);
  
    return (
      <div {...radioGroupProps}>
        <span {...labelProps}> {label}</span>
        
        <RadioContext.Provider value={state}>
            {children}
        </RadioContext.Provider>
      </div>
    );
}

function Radio(props) {
    let {children} = props;
    let state = useContext(RadioContext);
    let ref = useRef(null);
    let {inputProps} = useRadio(props, state, ref);
    let {isFocusVisible, focusProps} = useFocusRing();
  
    let isSelected = state.selectedValue === props.value;
    let strokeWidth = isSelected ? 6 : 2;
  
    return (
      <label style={{display: 'flex', alignItems: 'center'}}>
        <VisuallyHidden>
          <input {...inputProps} {...focusProps} ref={ref} />
        </VisuallyHidden>
        <svg width={24} height={24} aria-hidden="true" style={{marginRight: 4, marginTop: 3}}>
          <circle
            cx={12}
            cy={12}
            r={8 - strokeWidth / 2}
            fill="none"
            stroke={isSelected ? 'orange' : 'gray'}
            strokeWidth={strokeWidth}
          />
          {isFocusVisible && (
            <circle
              cx={12}
              cy={12}
              r={11}
              fill="none"
              stroke="orange"
              strokeWidth={2}
            />
          )}
        </svg>
        {children}
      </label>
    );
  }

const DestinationUrl = ({ mutate }) => {
    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)

    const [selected, setSelected] = useState('303')

    const updateSelection = (updatedSelection) => {
        setSelected([...updatedSelection])
    }

    return (
        <div className="w-full flex-col justify-start align-stretch">
            <InputElementCardWrapper
                title='HTTP Status Code'
                description={'Select the code that should be used to re-direct visitors'}
                children={
                    <RadioGroup label="">
                        <Radio value="301">301 (default) </Radio>
                        <Radio value="303">303</Radio>
                        <Radio value="307">307</Radio>
                        <Radio value="308">308</Radio>
                    </RadioGroup>
                }
            />
        </div>
    );
}

export default DestinationUrl