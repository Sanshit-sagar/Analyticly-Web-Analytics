import React, { Fragment, useState, useContext, useRef } from 'react'
import {useRouter} from 'next/router'

import toast from 'react-hot-toast'
import {GlobalStore} from '../store'

import Breadcrumbs from '../components/Breadcrumbs/index'
import StatisticsCards from '../components/StatisticsCards/index'

// import useMediaQuery from '../hooks/useMediaQuery'
import { useSession, signIn, signOut } from 'next-auth/client'

import Sidebar from './Sidebar'
import SecondarySidebar from './SecondarySidebar'
import Footer from './Footer'
import Header from './Header'
import ActionsMenu from '../components/ActionsMenu'

function StackedLayout({ children, pageMeta }) {

    const router = useRouter()
    
    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)

    const [session, loading] = useSession()

    const renavigate = (route) => {
        if(route !== state.router.current) {
            dispatch({
                type: 'navigate',
                payload: {
                    route: `${route}`,
                }
            });
            router.push(`${route}`)
            toast.success(`Navigated to ${state.router.current}`)
        } else {
            toast.error(`Already at ${route}`)
        }
    }

   
    return (
        <div className="h-screen flex bg-gray-50 overflow-hidden">
            <div className="w-full inline-flex space-between items-stretch">
                <Sidebar 
                    handleNavigation={renavigate}
                /> 
                <SecondarySidebar 
                    handleNavigation={renavigate}
                />

                <div className="w-full h-full flex-col justify-start items-stretch overflow-hidden order-last">
                    <Header 
                        handleNavigation={renavigate}
                    />

                    <div className="container mx-auto p-4 bg-gray-300 h-5/6">
                        <div className="w-full h-full bg-white overflow-y-scroll overflow-x-scroll shadow rounded-md">
                            <div className="w-full h-full inline-flex justify-between align-stretch px-2 py-2 mx-1 my-1">
                                {children}
                            </div>
                        </div>
                    </div>
                    
                    <ActionsMenu 
                        handleNavigation={renavigate}
                    /> 
                </div>
            </div>
        </div>
    );
}

export default StackedLayout