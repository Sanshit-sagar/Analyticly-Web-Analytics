import React from 'react'
import { Card, Typography } from '@supabase/ui'

import Loader from '../components/Loader'
// import LineChart from '../components/Charts/LineChart/index'
import StackedLayout from '../sections/StackedLayout'

import useSWR from 'swr'
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data)

const useTimeseries = () => {
  let stats = {};   
  const { data, error } = useSWR('/api/stream/timeseries', fetcher)

  if(data) {
     stats = {
        count: data.count, 
        frequencies: data.freqs, 
        average: data.average,
        maximum: data.max, 
        maxIndex: data.maxIndex, 
        earliest: data.earliestEvent, 
        latest: data.latestEvent,
        lastUpdated: new Date().getTime().toString()
     }; 
   }

   return {
     timeseries: data && data.timeseries ? data.timeseries : [],
     frequencies: data && Object.entries(data.freqs) ? data.freqs : {},
     statistics: data && stats ? stats : <p> error! </p>,
     loading: !data && !error,
     error
   }
}

const LineChartPage = () => {
  // const [status, setStatus] = useState('loading')
  const {timeseries, frequencies, statistics, loading, error} = useTimeseries(); 

  if(loading && !error) return <Loader />
  if(error) return <p> {`Error! ${error.message}`} </p>

  return (  
      <StackedLayout>
        <Card title={
            <Typography.Title level={2}> 
              Line Chart 
            </Typography.Title>
          }
        >
          <p> { JSON.stringify(timeseries) } </p> 
        </Card> 
      </StackedLayout>
  );
}

export default LineChartPage


