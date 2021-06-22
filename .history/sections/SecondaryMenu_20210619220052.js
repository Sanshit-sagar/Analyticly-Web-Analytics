

import React from 'react';
// import useSWR from 'swr'
// import { fetcher } from '../../lib/utils'
// import toast from 'react-hot-toast';
// import { useSession } from 'next-auth/client';
// import { GlobalStore } from '../../store';
import Breadcrumbs from '../components/Breadcrumbs';

import { 
    CreditCardIcon, 
    KeyIcon, 
    UserCircleIcon, 
    UserGroupIcon, 
    ViewGridAddIcon, 
    // SaveIcon 
} from '@heroicons/react/outline'

const navigation = [
  { name: 'Basic Details', href: '#', icon: UserCircleIcon, current: true },
  { name: 'Expiration (TTL)', href: '#', icon: KeyIcon, current: false },
  { name: 'SEO & UTM Tags', href: '#', icon: CreditCardIcon, current: false },
  { name: 'A/B Testing', href: '#', icon: UserGroupIcon, current: false },
  { name: 'IP Blacklist', href: '#', icon: ViewGridAddIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const MenuHeader = () => {

    return (
        <span className="bg-black text-white p-1 border-solid border-r-4 border-b-4 border-red-500 font-extralight">
            <h1> Heading here </h1>
            <subtitle> subheading here </subtitle>
            <br /> 
        </span>
    )
}

const SecondaryMenu = () => {

    return (
        // <aside>
        <div className="h-screen flex overflow-hidden bg-white">

            {/* <div className="hidden lg:flex lg:flex-shrink-0"> */}
                <div className="flex flex-col w-96">
                        
                    <div className="flex flex-col flex-1">
                        <div className="flex-1 flex flex-col pb-4 overflow-y-auto">
                            
                            <MenuHeader />

                            <nav className="mt-5 flex-1" aria-label="Sidebar">
                                <div className="space-y-1 bg-green-500">
                                    {navigation.map((item) => (
                                        <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                            ? 'bg-gray-200 text-gray-900'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                            'group flex items-center py-2 text-sm font-medium rounded-md'
                                        )}
                                        >
                                        <item.icon
                                            className={classNames(
                                            item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                            'mr-3 h-6 w-6'
                                            )}
                                            aria-hidden="true"
                                        />
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </nav>
                        </div>
                    </div>

                </div>
            </div>
        // </div>
    )
}

export default SecondaryMenu