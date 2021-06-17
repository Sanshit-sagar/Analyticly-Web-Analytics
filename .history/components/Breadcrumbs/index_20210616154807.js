import React, { useState, useContext } from 'react'
import { HomeIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/client'
import { GlobalStore } from '../../store'

const mapHistoryToHref = {
  '/new': '/new',
  '/clicks': '/clicks',
  '/links': '/links',
}

function Breadcrumbs() {
    const [session, loading] = useSession()

    const state = useContext(GlobalStore.State)

    const pages = [
        { 
          name: session && !loading ? session.user.email : '...', 
          href: '/', 
          current: false 
        },
        { 
          name: state.router.history[state.router.history.length - 1] || 'N/A', 
          href: mapHistoryToHref[`${state.router.history[-1]}`] || '/', 
          current: true 
        },
    ]; 

    return (
        // <nav className="bg-white border-b border-gray-200 flex" aria-label="Breadcrumb">
        //   <ol className="max-w-screen-xl w-full mx-auto px-4 flex space-x-4 sm:px-6 lg:px-8">
        //     <li className="flex">
        //       <div className="flex items-center">
        //         <a href="#" className="text-gray-400 hover:text-gray-500">
        //           <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
        //           <span className="sr-only">Home</span>
        //         </a>
        //       </div>
        //     </li>
        //     {pages.map((page) => (
        //       <li key={page.name} className="flex">
        //         <div className="flex items-center">
        //           <svg
        //             className="flex-shrink-0 w-6 h-full text-gray-200"
        //             viewBox="0 0 24 44"
        //             preserveAspectRatio="none"
        //             fill="currentColor"
        //             xmlns="http://www.w3.org/2000/svg"
        //             aria-hidden="true"
        //           >
        //             <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
        //           </svg>
        //           <a
        //             href={page.href}
        //             className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
        //             aria-current={page.current ? 'page' : undefined}
        //           >
        //             { page.name && page.name.length > 1 ? 
        //               page.name.charAt(0)==='/' ? `${page.name.charAt(1).toUpperCase()}${page.name.substring(2)}` : page.name
        //               : 'N/A'}
        //           </a>
        //         </div>
        //       </li>
        //     ))}
        //   </ol>
        // </nav>
        <nav aria-label="breadcrumb"> 
          <ol class="breadcrumb flex">
            <li class="breadcrumb-item text-gray-600">
              <a href="#" class="text-gray-600 hover:text-purple-700 mx-3">
                Home
              </a>
              
            </li>
            <h3> / </h3>
            <li class="breadcrumb-item text-gray-600"><a href="#" class="text-gray-600 hover:text-purple-700 mx-2">Library</a></li>
            <li class="breadcrumb-item active text-purple-700 hover:text-purple-700 mx-2" aria-current="page">Data</li> 
          </ol>
        </nav>
    )
}

export default Breadcrumbs