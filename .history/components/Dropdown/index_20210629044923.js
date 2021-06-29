import {
  Dropdown,
  Button,
  Divider,
  Typography,
  IconLogOut,
  IconSettings,
  IconChevronDown,
} from '@supabase/ui'

import Loader from '../Loader'
import { useSession } from 'next-auth/client'

const DropdownBasic = () => {
  const [session, loading] = useSession()

  return (
    <Dropdown
      overlay={[
        <Dropdown.Misc icon={loading ? <Loader /> : session && session.user ? <UserIcon /> : }>
          <Typography.Text>
            {session && session?.user ? session.user.email : loading ? '...' : 'Unauthenticated' }
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