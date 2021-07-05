import React, {useState} from 'react';

// import { GlobalStore } from '../../store'
import { Input, Button, Badge } from '@supabase/ui'

const BlacklistedIpList = ({ blacklist, handleBlacklistDeletion }) => {
    

    return (
        <li className="inline-flex justify-start align-start flex-wrap max-w-full">
            {blacklist.map(function(value, index) {
                return (
                    <ul key={index}>
                        <Badge 
                            color="indigo" 
                        >
                            {value}
                            <Button onClick={() => {
                                    handleBlacklistDeletion(index)
                                }}
                            > 
                                x
                            </Button>
                        </Badge> 
                    </ul>
                )
            })}
        </li> 
    )
}

const IpAddressInput = ({ handleBlacklistAddition }) => {
    const [currentIp, setCurrentIp] = useState('')

    const handleIpUpdate = (event) => {
        setCurrentIp(event.target.value)
    }

    const clearIpInput = () => {
        setCurrentIp('')
    }

    return (
        <Input 
            label="IP Address"
            value={currentIp}
            onChange={handleIpUpdate}
            actions={[
                <Button 
                    onClick={() => {
                        handleBlacklistAddition(currentIp)
                        clearIpInput()
                    }}
                    success
                >
                    Add to Blacklist
                </Button>,
            ]}
        />

    )
}



const BlaclistInputContent = () => {
    const [blacklist, setBlacklist] = useState([])

    const handleBlacklistAddition = (newlyBlacklistedIp) => {
        setBlacklist([...blacklist, newlyBlacklistedIp]);
    }

    const handleBlacklistDeletion = (index) => {
        setBlacklist(blacklist.filter(function(e, i) {
            return i!==index; 
        })); 
    }

    return (
        <>
            <BlacklistedIpList 
                blacklist={blacklist} 
                handleBlacklistDeletion={handleBlacklistDeletion} 
            /> 
            <IpAddressInput 
                handleBlacklistAddition={handleBlacklistAddition} 
            />
        </>
    );
  }
  
   export default BlaclistInputContent
   
  