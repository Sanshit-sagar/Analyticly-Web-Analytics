import React, { useState, useContext } from 'react'
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/client'
import { GlobalStore } from '../../store'
import CustomSpinner from '../../buildingBlocks/Spinner'
import { formatPathAsMenuHeader } from '@/lib/utils'

// const pages = [
//   { name: 'Projects', header: formatPathAsMenuHeader(state.router.current), href: '', current: false },
//   { name: 'Project Nero', href: '#', current: true },
// ]

function Breadcrumbs() {
  const [session, loading] = useSession()

  const state = useContext(GlobalStore.State)
  const dispatch = useContext(GlobalStore.Dispatch)

  const pages = [
    { name: 'curr', value: state.router.current },
    { name: 'prev', value:  state.router.history[state.router.history.length - 1]}
  ]; 

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <div>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>

        {state.router.history.map((page, index, pages) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
              <a
                href={page.href}
                className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? 'page' : undefined}
              >
                {formatPathAsMenuHeader(page.route)}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs

