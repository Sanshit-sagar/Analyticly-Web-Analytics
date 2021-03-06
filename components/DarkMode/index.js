import React, { useState, useEffect } from 'react';
import ToggleButton from '../../primitives/Toggle'
import { LoadingSpinner } from '../Loader'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

import toast from 'react-hot-toast'

const DarkMode = ({ darkMode, toggleDarkMode }) => {

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, []); 

    const handleToggleDarkMode = () => {
        if(!mounted) return 

        try {
            toggleDarkMode();
        } catch(error) {
            toast.error(`Oh no, couldn't update theme`); 
        }
    }

    let loading = !mounted;

    return (
        <div>
            <ToggleButton 
                isPressed={darkMode}
                handlePress={handleToggleDarkMode}
                pressedElem={loading ? <LoadingSpinner /> : <MoonIcon />} 
                unpressedElem={loading ? <LoadingSpinner /> : <SunIcon />}
            /> 
        </div>
    )
}


export default DarkMode
