import {
  Dropdown,
  Button,
  Divider,
  Typography,
  IconLogOut,
  IconChevronDown,
} from '@supabase/ui'

import ExclamationCircleIcon from '@heroicons/react/solid'

import Loader from '../Loader'
import { useSession } from 'next-auth/client'

const DropdownBasic = () => {
  const [session, loading] = useSession()

  return (
    <Dropdown
      overlay={[
        
        <Dropdown.Misc 
          icon={
              loading ? <Loader />  
            : session && session.user ? <UserIcon /> 
            : <ExclamationCircleIcon className="h-6 w-6 text-black" /> 
          }
        >

          <Typography.Text>
            { 
                session && session?.user ? <span className="text-black text-sm"> session.user.email </span>
              : loading ? '...' 
              : 'Unauthenticated' 
            }
          </Typography.Text>
        </Dropdown.Misc>,
        <Divider light />,
        <Dropdown.Item>
          <Typography.Text>
            <a href='/dashboard'> 
              My Dashboard 
            </a>
          </Typography.Text>
        </Dropdown.Item>,
        <Dropdown.Item>
          <Typography.Text>
            <a href='/profile'> 
              Preferences 
            </a>
          </Typography.Text>
        </Dropdown.Item>,

        <Divider light />,
        <Dropdown.Item icon={<IconLogOut />}>
          <Typography.Text>Log out</Typography.Text>
        </Dropdown.Item>,
      ]}
    >
      <Button type="outline" iconRight={<IconChevronDown />}>
        Click for dropdown
      </Button>
    </Dropdown>
  )
}


export default DropdownBasic