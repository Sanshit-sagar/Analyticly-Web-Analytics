import React, { useContext } from 'react'
import {useRouter} from 'next/router'

import { Toaster, toast } from 'react-hot-toast'
import { GlobalStore } from '../store'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'

function StackedLayout({ children, pageMeta }) {
    const router = useRouter()
    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)

    const renavigate = (route) => {
        if(route !== state.currentPage) {
            dispatch({
                type: 'navigate',
                payload: {
                    route: `${route}`,
                    value: `${route}`,
                }
            });
            router.push(`${route}`)
            toast.success(`Navigated to ${state.currentPage}`)
        } else {
            toast.error(`Already at ${route}`)
        }
    }

    const sendToasty = (toastyMessage) => {
        if(toastyMessage && toastyMessage?.length) {
            console.log('proxying message to toaster')
            toast.message(`${toastyMessage}`)
        }
    }
   
    return (
    
        <div className="h-screen flex">
            <Toaster 
                position="bottom-right" 
                reverseOrder={true} 
            />

            <div className="w-full inline-flex space-between items-stretch">
                <Sidebar 
                    handleNavigation={renavigate}
                    broadcastToast={sendToasty}
                /> 

                <div className="w-full h-full flex-col justify-start items-stretch order-last">
                    <Header 
                        handleNavigation={renavigate}
                        broadcastToast={sendToasty}
                    />
                
                    <div className="container mx-auto my-auto verflow-y-scroll rounded-md">
                        <div className="w-full h-full shadow rounded-md">
                            <> {children}  </>
                        </div>
                    </div>

                    {/* <Footer handleNavigation={renavigate} />  */}
                </div>
            </div>
        </div>
    );
}

export default StackedLayout