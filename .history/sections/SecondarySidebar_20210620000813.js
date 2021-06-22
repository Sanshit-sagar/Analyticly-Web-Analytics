

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
    ChevronLeftIcon 
} from '@heroicons/react/outline'

const menuItems = [
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
        <span className="bg-black text-white p-1 border-solid border-r-2 border-b-2 border-gray-700 font-extralight">
            <h1> Heading here </h1>
            <subtitle> subheading here </subtitle>
            <br /> 
        </span>
    )
}

const SecondarySidebar = () => {

    return (
        <div className="h-screen flex overflow-hidden border-l-2 border-gray-700">
            <div className="flex xl:overflow-hidden">
                
            
            <nav aria-label="Breadcrumb" className="bg-white border-b border-blue-gray-200 xl:hidden">
              <div className="max-w-3xl mx-auto py-3 px-4 flex items-start sm:px-6 lg:px-8">
                <a href="#" className="-ml-1 inline-flex items-center space-x-3 text-sm font-medium text-blue-gray-900">
                  <ChevronLeftIcon className="h-5 w-5 text-blue-gray-400" aria-hidden="true" />
                  <span>Settings</span>
                </a>
              </div>
            </nav>

            <nav
                aria-label="Sections"
                className="hidden flex-shrink-0 w-96 bg-white border-r border-blue-gray-200 xl:flex xl:flex-col"
              >
                <div className="flex-shrink-0 h-16 px-6 border-b border-blue-gray-200 flex items-center">
                  <p className="text-lg font-medium text-blue-gray-900">Settings</p>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto">
                  {menuItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-blue-50 bg-opacity-50' : 'hover:bg-blue-50 hover:bg-opacity-50',
                        'flex p-6 border-b border-blue-gray-200'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      <item.icon className="flex-shrink-0 -mt-0.5 h-6 w-6 text-blue-gray-400" aria-hidden="true" />
                      <div className="ml-3 text-sm">
                        <p className="font-medium text-blue-gray-900">{item.name}</p>
                        <p className="mt-1 text-blue-gray-500">{item.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </nav>

            </div>
        </div>
    )
}

export default SecondarySidebar