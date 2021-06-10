import Logo from '../components/Logo'
import { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@heroicons/react/solid'
import { useSession, signIn } from 'next-auth/client'
const isLargeScreen = useMediaQuery(['(min-width: 640px)'], [true], false);

import {
    ChevronDownIcon,
    DocumentTextIcon,
    GlobeIcon,
    PlusCircleIcon
} from '@heroicons/react/outline'

const Header = () => {
    const menuRef = useRef()

    const [session, loading] = useSession()
    const [mounted, setMounted] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false) 

    const { theme, systemTheme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true)
    }, [])

    const renderThemeChanger = () => {
        if(!mounted) return null

        const currentTheme = theme === 'system' ? systemTheme : theme; 
            
        if(currentTheme==='dark') {
            return (
                <SunIcon 
                    className="w-7 h-7" 
                    role="button" 
                    onClick={() => setTheme('light')} 
                />
            );
        } else {
            return (
                <MoonIcon 
                    className="w-7 h-7" 
                    role="button" 
                    onClick={() => setTheme('dark')} 
                />
            );
        }
    }

    const ProfileMenu = () => {

        if(!session && !loading) {
            return (
                <button
                    type="button"
                    onClick={() => signIn()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 whitespace-nowrap"
                >
                    Sign in
                </button>
            )
        }
        if(loading) return <p> loading... </p>

        return (
            <div>
                <div className="relative" ref={menuRef}>
                  <div
                    className="flex items-center space-x-1 sm:space-x-2"
                    role="button"
                    onClick={() => setMenuOpen(prev => !prev)}
                  >
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="rounded-full border-2 border-blue-600 w-8 h-8"
                    />
                    <p className="flex items-center sm:space-x-1">
                      <span className="hidden sm:inline-block">
                        Hello, {session.user.name?.split(' ')?.[0] ?? 'there'}
                      </span>{' '}
                      <ChevronDownIcon className="w-4 h-4 flex-shrink-0 mt-1" />
                    </p>
                  </div>

                  <FlyoutMenu
                    links={links}
                    show={menuOpen}
                    containerRef={menuRef}
                    onClose={() => setMenuOpen(false)}
                  />
                </div>
             </div>
        );
    }


    return (
        <header className="border-b border-gray-100 dark:border-gray-700">
            <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 py-4">
                <Logo /> 
                {renderThemeChanger()}
                <ProfileMenu /> 
            </div>
        </header>
    )
}

export default Header 