import React from 'react';

import { Text } from '../../primitives/Text'
import { TextField } from '../../primitives/TextField'
import { Flex } from '../../primitives/Flex'
import { Label, Fieldset } from '../../primitives/Label'
import { LoadingSpinner } from '../../components/Loader'

import { formatOpenGraphData } from '../../lib/utils' 
import { InputElementCardWrapper } from './index'; 
import useSWR from 'swr'
import { atom, useAtom } from 'jotai'

const urlValidator = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi); 
  
const destinationUrlAtom = atom('');
const isValidAtom = atom((get) => urlValidator.test(get(destinationUrlAtom)));

const ValidResult = () => <Text size='1'> Looks good! </Text>;
const InvalidResult = () => <Text size='1'> 'Hmmm, that doesnt look like a valid URL </Text>;
const DestinationUrlLabel = () => <Label htmlFor="destinationUrl"> <Text size='1'> Destination URL </Text> </Label>;

const DestinationUrlInput = () => {
    const [input, setInput] = useAtom(destinationUrlAtom)
    return (
        <TextField
            id="url" 
            type="url"
            placeholder="https://www.example.com"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autocomplete="off"
            css={{ 
                border: 'thin solid', 
                borderColor: '$hiContrast', 
                bc: '$loContrast', 
                color: '$loContrast', 
                '&:hover': {
                    backgroundColor: '$blue1',
                },
                fontSize: 12,
                lineHeight: 1,
                height: 30,
                maxWidth: '975px'
            }}
        />
    )
}

const ValidationResult = () => {
    const [isValidUrl] = useAtom(isValidAtom);

    return (
        <Flex css={{ fd: 'row', jc: 'flex-end', ai: 'flex-end', mt: '$2' }}>
            <Text size='1' css={{ color: '$hiContrast' }}> 
                {isValidUrl ? <ValidResult />  :  <InvalidResult />}
            </Text> 
        </Flex>
    )
}

const OgOutput = () => {
    const [input, setInput] = useAtom(destinationUrlAtom)
    const [isValidUrl] = useAtom(isValidAtom)

    const { data, error } = useSWR(isValidUrl ? `/api/links/opengraph?url=${input}` : null); 

    if(!data && !error) return <LoadingSpinner />     

    return (
        <Text> 
            {data && !error ? JSON.stringify(data) : 'N/A'} 
        </Text>
    ); 
}

const DestinationUrl = () => {

    return (
            <InputElementCardWrapper
                title="Destination URL"
                description='Enter the URL of the website youd like to generate a slug for'
            > 
                <Fieldset> 
                    <DestinationUrlLabel />
                    <DestinationUrlInput />
                    <ValidationResult />
                    <OgOutput />
                </Fieldset>
            </InputElementCardWrapper>
    );
}

export default DestinationUrl