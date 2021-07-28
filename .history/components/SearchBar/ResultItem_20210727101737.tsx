import React from 'react'
import { Flex } from '../../primitives/Flex'
import { Box } from '../../primitives/Box'
import { Text } from '../../primitives/Text'
import { ellipses } from '../../lib/utils'

interface IResultProps {
    click
}

const ScrollableResults: React.FC<any> = ({ }) => {
    return (
        <ScrollView  
            content={
                    !state.searchbar.results?.length ? searchQuery.length 
                ?   <NoSearchResults cause="No links or clicks match your query" />  
                :   <NoSearchResults cause="No query yet you dum dum" />  
            :   <div>
                    { state.searchbar.results.map(function(click, index) { 
                        return (
                            <ResultItem click={click} index={index} />
                        );
                    })}
                </div>
            }
        />
    )

}

const ResultItem:React.FC<any> = ({ click, url }) => {
    let clickPercentage = click.score * 100

    return (
        <Box css={{ width: '95%', height: '40px', border: 'thin solid black', borderRadius: '5px', margin: '1px 2px 0px 2px', padding: '1px 3px 0px 2px' }}>
            <Flex css={{ fd: 'row', jc: 'space-between', ai: 'flex-start', width: '100%' }}>
                <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
                    <Text> {ellipses(click.slug, 40)} </Text>
                    <Text> {ellipses(click.url, 50)} </Text>
                </Flex>

                <div 
                    className={
                          clickPercentage > 50 ? 'text-sm font-extralight text-green-500' 
                        : clickPercentage > 25 ? 'text-sm font-extralight text-yellow-500' 
                        : 'text-sm font-extralight text-red-500'
                    }
                >
                    {Math.round(clickPercentage)}%
                </div>
            </Flex>
        </Box>
    )
}

<div style={{ marginTop: '5px', width: '100%', border: 'thin solid black', borderRadius: '5px', padding: '5px'}}>

<p style={{ marginTop: '5px', paddingTop: '5px', paddingBottom: '5px', borderTop: 'thin solid black', backgroundColor: '#efefef'}}>
    <span className="text-sm font-extralight">
        Fuzzy search found {state.searchbar.results.length} results
    </span>
</p>
</div>