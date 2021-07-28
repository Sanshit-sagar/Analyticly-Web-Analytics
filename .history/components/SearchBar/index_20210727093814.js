import React, { useContext, useState, useEffect, useRef } from 'react'
import { styled } from '../../stiches.config'
import { useSession } from 'next-auth/client'
import useSWR from 'swr'


import {useButton} from '@react-aria/button'
import {useSearchField} from '@react-aria/searchfield'
import {useSearchFieldState} from '@react-stately/searchfield'

import { ellipses } from '../../lib/utils'
import { NewSlugStore } from '../../store'

import Loader from '../Loader'

import {
    Popover, 
    PopoverContent, 
    PopoverTrigger 
} from '../../primitives/Popover'

import HorizontalTabs from '../../primitives/Tabs'
import IconButton from '../../primitives/IconButton'
import ScrollView from '../../primitives/ScrollView'
import ToggleButton from '../../primitives/Toggle'

import { Flex } from '../../primitives/Flex'
import { Text } from '../../primitives/Text'
import { Box } from '../../primitives/Box'
import { AccessibleIcon } from '../../primitives/AccessibleIcon'
import { Input } from '../../primitives/LabelledInput'

import NoSearchResults from '../EmptyStates/NoSearchResults'
import { MagnifyingGlassIcon, FaceIcon } from '@radix-ui/react-icons'
import SearchField from './SearchField'

const useUserClickstream = (email) => {
    const { data, error } =  useSWR(email && email.length ? `/api/slugs/aliases/${email}` : null)
    
    return {
        clickstream: data ? data.links : null,
        isLoading: !data && !error,
        isError: error
    }
}


const StyledInput = ({ searchQuery, searchArea }) => {
    const state = useContext(NewSlugStore.State)
    const [pressed, setPressed] = useState(false)

    useEffect(() => {
        // set to unpressed when user focusses away from the dialog
        if(!searchQuery.length && !searchArea.length) {
            setPressed(false); 
        }
    }, [searchArea, searchQuery]);

    return (
        <Box css={{ width: '200px', border: 'thin solid black', borderRadius: '5px', padding: '10px', marginTop: '2.5px' }}>
            <Flex css={{ fd:'row', jc:'flex-start', ai:'center'}}>
                <AccessibleIcon label={`Searchbar`}>
                    <MagnifyingGlassIcon />
                </AccessibleIcon>
                <Text style={{ ml: '5px' }}> 
                    {!searchQuery?.length ? 'Search...' : `${searchQuery}` }
                </Text>
            </Flex>
       </Box>
    );
}

const StyledAnchor = styled(Popover.Anchor, {
    background: 'gainsboro',
});   

const SearchBar = (props) => {
    const [session, loading] = useSession()
    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)

    const [searchQuery, setSearchQuery] = useState('')
    const [searchArea, setSearchArea] = useState([])
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    let {label} = props;
    let ref = useRef();
    let searchState = useSearchFieldState(props);
    let {labelProps, inputProps, clearButtonProps} = useSearchField(props,searchState,ref);
    let {buttonProps} = useButton(clearButtonProps, ref);

    const updateResults = (updatedResultsArr) => {
        dispatch({
            type: 'search_results',
            payload: {
                results: updatedResultsArr
            }
        }); 
    }

    const togglePopoverState = () => {
        setIsPopoverOpen(!isPopoverOpen)
    }
    
    let email = session ? session.user.email : ''
    const { clickstream, isLoading, isError } = useUserClickstream(email);

    const preventDefaultHandler = (event) => {
        event.preventDefault(); 
    }

    const handleEscape = (event) => {
        toast.success(`Escaping popover`)
    }

    useEffect(() => {
        if(!isLoading && !isError && clickstream && !searchArea.length) {
            let temp = [];
            let clickstreamArr = Object.values(clickstream)
            clickstreamArr.map(function(click, index) {
                let clickInfo = JSON.parse(click)
                temp.push({
                    slug: clickInfo.slug,
                    url: clickInfo.url,
                    ttl: clickInfo.config.ttl,
                    blacklist: clickInfo.config.blacklist,
                    routingStatus: clickInfo.config.routingStatus,
                    password: clickInfo.config.password,
                    seoTags: clickInfo.config.seoTags,
                });
            });
            setSearchArea([...temp]); 
        }
    }, [clickstream, isLoading, isError, searchArea]);

    if(loading || isLoading) return <Loader />
    if(isError) return <p> Error: {isError.message} </p>

    return (
        <Popover
            isOpen={isPopoverOpen}
            onOpenChange={(updatedState) => setIsPopoverOpen(updatedState)}
        >
            <PopoverTrigger>
                <ToggleButton 
                    isPressed={isPopoverOpen}
                    handlePress={togglePopoverState}
                    pressedElem={null} 
                    unpressedElem={<MagnifyingGlassIcon />}
                /> 
            </PopoverTrigger>

            <PopoverContent 
                side="right"
                trapFocus={false}
                hideArrow={false} 
                avoidCollisions={true}
                onInteractOutside={(event) => preventDefaultHandler(event)}
                onFocusOutside={(event) => preventDefaultHandler(event)}
                onPointerDownOutside={(event) => preventDefaultHandler(event)}
                onEscapeKeyDown={() => handleEscape()}
                disableOutsidePointerEvents={false}
                onCloseAutoFocus={(event) => preventDefaultHandler(event)}
            >
            <div style={{ height: '300px', width: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'stretch'}}>
                <div className="bg-white rounded-md shadow-md border border-black">
                    <div className="search-field">
                        <label {...labelProps}> {label} </label>
                        <div>
                            <input
                                placeholder="Looking for something?"
                                value={searchQuery}
                                onChange={ async (e) => {
                                    const { value } = e.currentTarget
                                    setSearchQuery(value)
                                    if(value && value.length && searchArea && searchArea.length) {
                                        let options = {
                                            includeScore: true,
                                            keys: ['slug', 'url'],
                                        };
                                        const Fuse = (await import('fuse.js')).default
                                        const fuse = new Fuse(searchArea, options)

                                        let temp = [];
                                        let results = fuse.search(value)
                                        if(results && results.length) {
                                            results.map(function(value, index) {
                                                temp.push({ 
                                                    slug: value.item.slug, 
                                                    url: value.item.url,
                                                    ttl: value.ttl,
                                                    index: value.refIndex,
                                                    score: value.score,
                                                }); 
                                            });
                                            updateResults(temp.sort((a, b) => b.score - a.score)); 
                                        } else {
                                            updateResults([])
                                        }
                                    }
                                }}
                            />
                            {searchQuery.length && 
                                <button {...buttonProps} onClick={() => setSearchQuery('')}>❎</button>}
                        </div>
                    </div>
                </div>
                    
                <div style={{ marginTop: '5px', width: '100%', border: 'thin solid black', borderRadius: '5px', padding: '5px'}}>
                    <ScrollView  
                        content={
                                !state.searchbar.results?.length ? searchQuery.length 
                            ?   <NoSearchResults cause="No links or clicks match your query" />  
                            :   <NoSearchResults cause="No query yet you dum dum" />  
                            :   <div>
                                    { state.searchbar.results.map(function(click, index) { 
                                        let clickPercentage = click.score * 100

                                        return (
                                            <Box css={{ width: '95%', height: '40px', border: 'thin solid black', borderRadius: '5px', margin: '1px 2px 0px 2px', padding: '1px 3px 0px 2px' }}>
                                                <Flex css={{ fd: 'row', jc: 'space-between', ai: 'flex-start', width: '100%' }}>
                                                    <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch' }}>
                                                        <div className="text-xs font-extralight text-black"> 
                                                            {ellipses(click.slug, 40)}
                                                        </div>
                                                        <div className="text-xs font-extralight text-gray-600">
                                                            {ellipses(click.url, 50)}
                                                        </div>
                                                    </Flex>

                                                    <div className={clickPercentage > 50 ? 'text-sm font-extralight text-green-500' : clickPercentage > 25 ? 'text-sm font-extralight text-yellow-500' : 'text-sm font-extralight text-red-500'}>
                                                        {Math.round(clickPercentage)}%
                                                    </div>
                                                </Flex>
                                            </Box>
                                        );
                                    })}
                                </div>
                        }
                    />
                        <p style={{ marginTop: '5px', paddingTop: '5px', paddingBottom: '5px', borderTop: 'thin solid black', backgroundColor: '#efefef'}}>
                            <span className="text-sm font-extralight">
                                Fuzzy search found {state.searchbar.results.length} results
                            </span>
                        </p>
                    </div>
                </div>
                  
            </PopoverContent>

        </Popover>
    )
}

export default SearchBar

