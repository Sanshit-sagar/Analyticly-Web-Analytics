import React, { useContext } from 'react'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { ellipses } from '../../lib/utils'
import NoSearchResults from '../EmptyStates/NoSearchResults'
import ScrollView from '../../primitives/ScrollView'
import { NewSlugStore } from '../../store'

interface IResultsListProps {
    searchQuery: string;
}

interface IResultItemProps {
    index: number;
};

const ScrollableResults:React.FC<IResultsListProps> = ({ searchQuery }) => {
    const state = useContext(NewSlugStore.State)

    return (
        <Box css={{ borderRadius: '5px', backgroundColor: '#efefef' }}>
            <ScrollView   
                content={ 
                      !state.searchbar.results?.length || !searchQuery?.length 
                    ? <NoSearchResults cause="No links or clicks match your query" action={null} name={null} icon={null}  />  
                    : <Box css={{ width: '95%' }}>
                        {state.searchbar.results.map(function(click, index) { 
                            return (
                                <ResultItem index={index} />
                            );
                        })}
                    </Box>
                }
                areaHeight={400}
                areaWidth={400}
            />
            <ResultsSummary />
        </Box>
    );
}

const ResultItem:React.FC<IResultItemProps> = ({ index }) => {
    const state = useContext(NewSlugStore.State)
    
    if(index < 0 || !state.searchbar.results?.length || state.searchbar.results.length < index) {
        return null; 
    } 

    return (
        <Box css={{ border: 'thin solid black', borderRadius: '5px', margin: '1px 2px 0px 2px', padding: '1px 3px 0px 2px' }}>
            <Flex css={{ fd: 'row', jc: 'space-between', ai: 'flex-start', width: '100%' }}>
                <Box css={{ padding: '$1' }}>
                    <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
                        <Text> {ellipses(state.searchbar.results[index].slug, 40)} </Text>
                        <Text> {ellipses(state.searchbar.results[index].url, 20)} </Text>
                    </Flex>
                </Box>

                <Text css={{color: state.searchbar.results[index].score > .5 ? 'green' : 'red'}}>
                   {Math.round(state.searchbar.results[index].score * 100)}%
                </Text>
            </Flex>
        </Box>
    )
}

export default ScrollableResults;
