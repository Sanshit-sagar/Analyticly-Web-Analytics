import React, { useState, useMemo } from 'react'
import { useSession } from 'next-auth/client'
import { Button } from '@supabase/ui'

import useSWR from 'swr'
import axios from 'axios'

import useDateTimeConverter from '../../hooks/useDateTimeLocalizer'
import StackedLayout from '../../sections/StackedLayout'
import Loader from '../../components/Loader'
import SortedStatModal from '../../components/SortedStatModal'



const TabulatedData = () => {
    return (
        <SortedStatModal filter="allViews"/>
    );
}

const TablelyticsWrapper = ({ metadata }) => {
    
    return (
        <StackedLayout pageMeta={metadata}>
            <TabulatedData />
        </StackedLayout>
    );
}

export default TablelyticsWrapper

TablelyticsWrapper.defaultProps = {
    metadata: { 
        title: 'Tablelytics', 
        description: 'Testing tables'
    }
}
  