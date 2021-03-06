//hi

import React, { useState } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { styled } from '@stitches/react';

import { violet, blackA, mauve } from '@radix-ui/colors'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useSession, signIn, signOut } from 'next-auth/client'
import { HamburgerMenuIcon, HomeIcon, GearIcon, ExitIcon, EnterIcon, LockClosedIcon } from '@radix-ui/react-icons'

import { Box } from '../primitives/Box'
import { Flex } from '../primitives/Flex'
import { Text } from '../primitives/Text'
import { Avatar, AvatarImage, AvatarFallback  } from '../primitives/Avatar'
import ToggleButton from '../primitives/Toggle';

const IconButton = styled('button', {
  appearance: 'none',
  backgroundColor: '$loContrast',
  color: '$hiContrast',
  padding: '6.5px',
  boxShadow: 'inset 0 0 0 1px gainsboro',
  overflow: 'hidden',
  borderRadius: '4px',
  marginLeft: '10px',
  height: 35,
  
  '&:focus': {
    outline: 'none',
    border: 'none',
  },

  "&:hover": {
    transform: "scale(1.1)",
    backgroundColor: violet.violet12,
    color: 'white',
  },
});

export const StyledContent = styled(DropdownMenu.Content, {
  minWidth: '175px',
  backgroundColor: 'white',
  borderRadius: 6,
  padding: 5,
  boxShadow: '0px 5px 15px -5px rgba(0,255,0,0.2)',
});

export const StyledItem = styled(DropdownMenu.Item, {
  width: '100%',
  display: 'flex', 
  flexDirection: 'row', 
  justifyContent: 'space-between', 
  alignItems: 'center',
  padding: '5px 2px 5px 2px',
  cursor: 'default',

  '&:focus': {
    outline: 'none',
    backgroundColor: blackA.blackA12,
    color: '#fff',
  },
});

export const StyledSeparator = styled(DropdownMenu.Separator, {
  height: 1,
  backgroundColor: blackA.blackA12,
  margin: 5,
});


export const StyledArrow = styled(DropdownMenu.Arrow, {
  fill: 'black',
});

const StyledLabel = styled(DropdownMenu.Label, {
  paddingLeft: '15px',
  fontSize: '12px',
  lineHeight: '25px',
  color: mauve.mauve11,
});

function isPathValid(path) {
  // double check this
  return path && path?.length; 
}

function getInitials(name) {
  let nameArr = name.length ? name.split(' ') : [name.split(' ')[0] || ''];
  return `${nameArr[0]}{nameArr[1]}`; 
}

const Dropdown = ({ label }) => {
  const [open, setOpen] = React.useState(false)
  const router = useRouter(); 
  const [session, loading] = useSession(); 


  const handleNavigation = (destination) => {
    if(isPathValid(destination) && session?.user?.name.length) {
      router.push(`${destination}`);
      toast.success(`Navigating to ${destination}`);
    } else {
      router.push(`/api/auth/signin`);
      toast.error(`Failed to navigate to ${destination} since it's an invalid path`);
    }
  }

  const handlePress = () => {
    setOpen(!open)
  }

  return (
      <DropdownMenu.Root open={open} onOpenChange={handlePress}>
        <><DropdownMenu.Trigger>
          <ToggleButton
            isPressed={open}
            handlePress={handlePress}
            pressedElem={session && !loading ? <HamburgerMenuIcon /> : <LockClosedIcon />}
            unpressedElem={session && !loading ? <HamburgerMenuIcon /> : <LockClosedIcon />}
          />
        </DropdownMenu.Trigger></>
        <StyledContent sideOffset={5} align="end">

          <StyledItem onSelect={() => console.log(`Clicked on the profile item`)}>  
              <Box css={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'}}> 
                  <Flex css={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: '10px' }}>
                   { session && session.user ? 
                    <Avatar>
                      <AvatarImage
                        src={session.user.image} 
                        alt={session.user.name} 
                      />
                      <AvatarFallback delayMs={600}> {getInitials(session.user.name)} </AvatarFallback>
                    </Avatar>
                  :
                    <Text>
                      {   session && !loading  
                        ? `${session.user.email.substring(0,50)}${session && session.user && (session.user.email?.length >= 50) ? `...` : ''}` 
                        : `Not Signed In` 
                      } 
                    </Text>
                  }
                </Flex>
              </Box>
          </StyledItem>

          <StyledSeparator />
          <StyledLabel as={'span'}>
            Actions
          </StyledLabel>

          <StyledItem onSelect={() =>  handleNavigation('account')}>
            <span style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'}}>
              <span style={{ marginLeft: '3px' }}> 
                <HomeIcon /> 
              </span>
              <span className="text-sm font-extralight"> 
                Account 
              </span>
            </span>
          </StyledItem>

          <StyledItem onSelect={() => handleNavigation('settings')}>
            <span style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'}}>
              <span style={{ marginLeft: '3px' }}> 
                <GearIcon /> 
              </span>
              <span className="text-sm font-extralight"> 
                Settings 
              </span>
            </span>
          </StyledItem>

          <StyledSeparator />

          <StyledItem 
            onSelect={() => {
              if(session && !loading) {
                signOut();
              } else {
                signIn(); 
              }
            }}
          >
            <span style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'}}>
                <span className="text-red-500"> 
                  { session ? <ExitIcon /> : <EnterIcon /> }
                </span>
                <span className="text-sm font-extralight text-red-500"> 
                  { session ? 'Logout' : 'Login' }
                </span>
            </span>
          </StyledItem>

          <StyledArrow />
        </StyledContent>
        
      </DropdownMenu.Root>
  );
}

export default Dropdown