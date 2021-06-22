import React, {useState, useEffect} from 'react'
import {BellIcon} from '@heroicons/react/solid'


const NotificationBell = () => {
    return (
        <button className="flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
        </button>
    )
}

export default NotificationBell