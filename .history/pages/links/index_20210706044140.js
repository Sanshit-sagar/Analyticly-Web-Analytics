import React, { useState, useEffect, useContext } from 'react'
import useSWR from 'swr'
import axios from 'axios'

import useDateTimeConverter from '../../hooks/useDateTimeLocalizer'
import { NewSlugStore } from '../../store'

import Loader from '../../components/Loader'
import StackedLayout from '@/sections/StackedLayout'
import { DangerModal } from '../../buildingBlocks/Modal'

import { Button, IconTrash, IconEye } from '@supabase/ui'

import {
    TableContainer,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    TableFooter,
    Pagination
  } from '@windmill/react-ui'

const fetcher = url => axios.get(url).then(res => res.data);

const sanitize = (text, len) => {
    return text && text.length ? text.substring(0, len) : ''
}

const useUserLibrary = (email) => {
    const { data, error } = useSWR(email && email.length ? `/api/slugs/aliases/${email}` : null, fetcher, {
        revalidateOnFocus: false,
        revalidateOnMount:true,
        revalidateOnReconnect: false,
        refreshWhenOffline: false,
        refreshWhenHidden: false,
        refreshInterval: 0
    });

    return {
        links: data ? Object.values(data.links) : [],
        loading: !data && !error,
        error
    };
}

function getLocaleTimestring(timestamp) {
    return new Date(timestamp).toLocaleTimeString()
}

function getDateString(timestamp) {
    return new Date(timestamp).toDateString()
}
  
const LinkEntry = ({ index, cellsInRow, toggle }) => {
    const cells = JSON.parse(cellsInRow)

    let creationTimestamp = parseInt(cells.timestamp)
    let expiryTimestamp = cells.config ? (parseInt(cells.config.ttl) || '') : ''
    let currentTimestamp = new Date().getTime()
    
    let lifespan = expiryTimestamp - creationTimestamp
    let lifeLeft = expiryTimestamp - currentTimestamp
    
    let validity = lifeLeft > 0 ? 'Active' : 'Expired'
    let lifeLivedPercent = validity==='Active' ? (lifeLeft/lifespan)*100 : 0

    const cellValues = [
        [cells.slug, ''], 
        [sanitize(cells.url, 35), ''], 
        [getLocaleTimestring(creationTimestamp), getDateString(creationTimestamp)],
        [getLocaleTimestring(expiryTimestamp), getDateString(expiryTimestamp)],
        [validity, `${lifeLivedPercent} lifespan remaining`]
    ];

    const handleDelete = () => {
        toggle()
    }
    const handleOpen = () => {
        toggle()
    }

    return (
        <TableRow>
            <> {cellValues.map(function(value, index) {
                return (
                    <TableCell key={index}>
                         <div className="flex justify-between items-center">
                        
                            <div>
                                <div className="text-sm">
                                    {value[0]}
                                </div>
                                {value[1] && value[1]?.length ? 
                                    <div className="text-sm max-w-sm flex-auto flex-wrap">
                                        {value[1]}
                                    </div>
                                : null}
                            </div>
                            <>{value[2] ? 
                                <button  className="ml-6 flex-shrink-0">
                                    {value[2]}
                                </button> 
                                : null
                            }</>
                        </div>
                    </TableCell>
                )
            })} </>
            <TableCell> 
                xx views 
            </TableCell>
            <TableCell>
                <Button 
                    type="outline" 
                    size="small" 
                    icon={<IconTrash />} 
                    onClick={handleDelete}
                    className="mr-2" 
                />
                <Button 
                    type="primary" 
                    size="small" 
                    icon={<IconEye />} 
                    onClick={handleOpen} 
                />
            </TableCell> 
        </TableRow>
    );
}

const LinksTable = ({ links, visible, toggle }) => {
    // const state = useContext(NewSlugStore.State)

    const [cursor, setCursor] = useState(0)
    const [pageSize, setPageSize] = useState(7)

    const handlePagination = () => {
        setCursor(cursor + pageSize)
    }

    const columns = React.useMemo(() => [
        { Header: 'Slug' },
        { Header: 'Destination'},
        { Header: 'Created At' },
        { Header: 'Expiry (TTL)' },
        { Header: 'Validity' },
        { Header: 'Views' },
        { Header: 'Actions' },
    ], []);

    // let linksOnPage = links.slice(cursor, cursor + pageSize)

    return (
        <TableContainer>
            <Table>
                <TableHeader>
                    <TableRow className="text-left">
                        {columns.map(function(value, index) {
                            return (
                                <TableCell key={index}>
                                    {value.Header}
                                </TableCell>
                            )
                        })}
                    </TableRow>
                </TableHeader>

                <TableBody className="bg-white divide-y divide-gray-200">
                    {links.map(function(value, idx) {
                        return  (
                            <LinkEntry 
                                index={idx} 
                                cellsInRow={value} 
                                toggle={toggle}
                            />
                        )
                    })}
                </TableBody>
            </Table>

            <TableFooter>
                <Pagination 
                    totalResults={links.length}
                    resultsPerPage={pageSize} 
                    onChange={handlePagination} 
                    label="Table navigation" 
                />
            </TableFooter>
        </TableContainer>
    );
}


const LinksTableWrapper = ({ visible, toggle }) => {
    // const [session] = useSession()
    // const email  = session ? session.user.email : ''
    const email = 'sasagar@ucsd.edu'
    const [numUpdates, setNumUpdates] = useState(0)
    
    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)

    const { links, loading, error } = useUserLibrary(email)

    useEffect(() => {
        if(!loading && !error && links.length!==state.links.length) {
            dispatch({
                type: 'assign',
                payload: {
                    key: 'links',
                    value: links.sort((a, b) => {
                        if(JSON.parse(a).timestamp && JSON.parse(b).timestamp) {
                            return parseInt(JSON.parse(b).timestamp) - parseInt(JSON.parse(a).timestamp)
                        } else if(JSON.parse(a).timestamp) {
                            return parseInt(JSON.parse(a).timestamp)
                        } else if(JSON.parse(b).timestamp) {
                            return parseInt(JSON.parse(b).timestamp)
                        } 
                        return 0; 
                    }),
                }
            }); 
            setNumUpdates(numUpdates + 1)
        }
    }, [state.links, links, loading, error, numUpdates]); 

    if(loading) return <Loader />
    if(error) return <p> error! </p>

    return (
        <> 
            <p>{numUpdates}</p> 
            <LinksTable 
                links={state.links}
                visible={visible}
                toggle={toggle}
            />
        </>
    )
}

export default function LinksPage() {
    const [modalVisible, setModalVisible] = useState(false)

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }
    
    return (
       
        <StackedLayout 
            pageMeta={{ 
                title: 'Links', 
                description: 'All your saved slugs' 
            }} 
            children={
                <div className="mt-4">
                    <DangerModal 
                        visible={modalVisible} 
                        toggle={toggleModal} 
                    /> 
                    <LinksTableWrapper 
                        visible={modalVisible}
                        toggle={toggleModal}
                    />
                </div>
            }
        />
    );
}

// LinksPage.auth = true