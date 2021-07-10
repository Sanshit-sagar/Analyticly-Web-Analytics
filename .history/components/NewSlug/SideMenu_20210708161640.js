import React, { useContext } from 'react'
import { NewSlugStore } from '../../store' 
import { Menu } from "@supabase/ui";
import { 
    CalendarIcon, 
    LinkIcon, 
    BanIcon, 
    ExternalLinkIcon, 
    TrashIcon, 
    LightningBoltIcon,
    CursorClickIcon, 
    LockClosedIcon
} from '@heroicons/react/outline';
import { DocumentDuplicateIcon } from '@heroicons/react/solid';


function NewSlugNavMenu() {
    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)

    const handleTabChange = (event, itemId) => {
        dispatch({
            type: 'assign',
            payload: {
                key: 'currentTab',
                value: itemId
            }
        }); 
    }

    const details = [
        { id: 'destination', title: 'Destination', icon: <LinkIcon className="h-6 w-6" /> },
        { id: 'brand / slug', title: 'Customization', icon: <CursorClickIcon className="h-6 w-6" /> },
        { id: 'expiration', title: 'Expiration', icon: <CalendarIcon className="h-6 w-6"  /> },
    ]; 

    const analytics = [
        { id: 'seo', title: 'SEO Parameters', icon: <LightningBoltIcon className='h-6 w-6' />},
        { id: 'utm', title: 'UTM Tags', icon: <LightningBoltIcon className='h-6 w-6' />},
        { id: 'abtests', title: 'A/B Tests', icon: < />},
    ];
      
    const management = [ 
        { id: 'blacklists', title: 'Blacklists', icon: <BanIcon className="h-6 w-6"  /> },
        { id: 'password', title: 'Encryption', icon: <LockClosedIcon className="h-6 w-6" /> },
        { id: 'ratelimits', title: 'Encryption', icon: <PauseIcon className="h-6 w-6"  /> },
        { id: 'redirects', title: 'Redirects', icon: <ExternalLinkIcon className='h-6 w-6' />},
    ]; 

    const actions = [
        { id: 'share', title: 'Share', icon: <SocialLinkIcon className='h-6 w-6' /> },
        { id: 'duplicate', title: 'Duplicate', icon: <DocumentDuplicateIcon className='h-6 w-6' /> },
        { id: 'discard', title: 'Discard', icon: <TrashIcon className='h-6 w-6' /> },
    ]

    return (
        <Menu className='w-full h-full mr-2 text-gray-700 bg-white dark:bg-gray-700 dark:text-white'>
            <Menu.Group title="Actions">
                {items.map(function(item, index) {
                    return (
                        <div key={index}>
                            <Menu.Item 
                                icon={item.icon} 
                                showActiveBar 
                                active={state.currentTab===item.id}
                                onClick={(event) => {
                                        handleTabChange(event, item.id)
                                    }
                                }
                            >
                                {item.title} 
                            </Menu.Item> 
                        </div>
                    )
                })}
            </Menu.Group>
        </Menu>    
    );
  }
  

const SideMenuComponent = () => {

    return (
        <div className='flex-col justify-start align-start m-2 p-2 mr-5'>
            <NewSlugNavMenu />
        </div>  
    )
}

export default SideMenuComponent