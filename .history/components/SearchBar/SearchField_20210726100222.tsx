import React, { useState, useEffect, useContext } from 'react'

import {useButton} from '@react-aria/button'
import {useSearchField} from '@react-aria/searchfield'
import {useSearchFieldState} from '@react-stately/searchfield'

import { styled, keyframes } from '@stitches/react'

import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { Fieldset, Label, Input } from '../../primitives/LabelledInput'

const StyledInput = styled('input', {
    flex: 1,
    color: 'white',
    fontSize: '15px',

})

function SearchField(props) {
    let {label} = props;
    let ref = React.useRef();
    let state = useSearchFieldState(props);
    let {labelProps, inputProps} = useSearchField(props, state, ref);

    return (
        <Box css={{ width: '200px', flexBasis: '0', flexGrow: 1, margin: '5px'}}>
            <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
                <Fieldset>
                    <Label {...labelProps}> {label} </Label>
                    <Input {...inputProps} ref={ref} />
                </Fieldset>
            </Flex> 
        </Box>
    );
}
