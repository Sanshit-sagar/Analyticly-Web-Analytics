import React, { useState } from 'react'

import {
    TableContainer,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
} from '@windmill/react-ui'
import PieChart from '../Charts/PieChart/index'
import BarChart from '../Charts/BarChart/index'

import useSWR from 'swr'
import axios from 'axios'
import Loader from '../Loader'

import {generateSortedList} from '../../lib/statistics'

const fetcher = url => axios.get(url).then(res => res.data);

function sanitize(text) {
    if(!text) return '';
    return (text.length > 50) ? `${text.substring(0, 50)}...` : text || '';
}

const buttonClass = 'py-1 px-1 border border-2 rounded-md shadow-md ml-1 '


const aggregateStats = (data) => {
    let ips = {}
    let countries = {}
    let userAgents = {}
    let hosts = {}
    let tlsVersions = {}
    let httpProtocols = {}

    let skipped = 0;
    let count = 0; 

    data.forEach(click => {
        const ip = click.ipAddress
        const country = click.country
        const userAgent = click.userAgent
        const host = click.host
        const tlsVersion = click.tlsVersion
        const httpProtocol = click.httpProtocol

        if(!ip.length || !country.length || !userAgent.length) {
            ++skipped
        } else {
            const ipFreq = ips[ip] || 0
            const countryFreq = countries[country] || 0 
            const userAgentFreq = userAgents[userAgent] || 0
            const hostFreq = hosts[host] || 0
            const tlsVersionFreq = tlsVersions[tlsVersion] || 0
            const httpProtocolFreq = httpProtocols[httpProtocol] || 0
            
            ips[ip] = ipFreq + 1
            countries[country] = countryFreq + 1
            userAgents[userAgent] = userAgentFreq + 1
            hosts[host] = hostFreq + 1
            tlsVersions[tlsVersion] = tlsVersionFreq + 1
            httpProtocols[httpProtocol] = httpProtocolFreq + 1 
        }
        ++count
    });
    var sortedCountries = generateSortedList(countries)
    var sortedHosts = generateSortedList(hosts)
    var sortedIps = generateSortedList(ips)
    var sortedUserAgents = generateSortedList(userAgents)
    var sortedHttpProtocols = generateSortedList(httpProtocols)
    var sortedTlsVersions = generateSortedList(tlsVersions)

    return { 
        'countries': sortedCountries, 
        'ips': sortedIps, 
        'hosts': sortedHosts,
        'userAgents': sortedUserAgents, 
        'httpProtocols': sortedHttpProtocols,
        'tlsVersions': sortedTlsVersions,
        skipped, 
        count 
    }
}


function useClickstreamLeaderboards(email)  {
    const { data, err } = useSWR(email && email?.length ? `/api/stream/statistics` : null, fetcher)

    return {
        data: data ? data.headers : {},
        loading: !data && !err,
        error: err
    };
}


const DataTable = ({ data, title }) => {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableCell> {title} </TableCell>
                    <TableCell> Visits </TableCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Object.entries(data).map((datum, index) => {
                    return (
                        <TableRow key={index}>
                            <TableCell> 
                                <span className="w-32 text-md text-black font-extralight p-0 m-0">
                                    {sanitize(datum[1][0])}     
                                </span>
                            </TableCell>

                            <TableCell>
                                <span className="text-md text-black font-extralight p-0 m-0">
                                    {datum[1][1]} 
                                </span>    
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}

const DataChart = ({ data, title, type }) => {

    return (
        <span className="text-md font-extralight"> 
           
           {type==='pie' ?
            <PieChart 
                sortedData={data} 
                title={title} 
                type={type} 
            /> 
        :   <BarChart 
                sortedData={data} 
                title={title} 
                type={type} 
            />}
        </span>
    )
}




const LeaderboardTableItem = ({ data, title, type }) => {
    if(!data) return null

    const [displayType, setDisplayType] = useState('table')

    return (
        <div className="w-auto bg-white text-black rounded-md shadow-lg">
            <TableContainer>
                <div className="w-full inline-flex justify-between align-stretch mb-1 p-1">
                    <span className="text-md font-light">
                        {title}
                    </span>
                    <span className="inline-flex justify-end align-stretch">
                        <button 
                            className={`${buttonClass}${displayType==='table'?'bg-black text-white' : 'bg-white text-black'}`} 
                            onClick={() => setDisplayType('table')}
                        >
                            <span className="text-sm font-extralight"> 
                                table 
                            </span>
                        </button>
                        <button 
                            className={`${buttonClass}${displayType==='chart'?'bg-black text-white' : 'bg-white text-black'}`} 
                            onClick={() => setDisplayType('chart')}
                        >
                            <span className="text-sm font-extralight"> 
                                chart
                            </span>
                        </button>
                    </span>
                </div>
                
                {   
                    displayType==='table' ? 
                    <DataTable data={data} title={title} /> : 
                    <DataChart data={data} title={title} type={type} />
                }
          
            </TableContainer>
        </div>
    )
}


const LeaderboardTable = ({ email, time }) => {
    
    const {data, loading, error} = useClickstreamLeaderboards(email) 
    if(loading) return <Loader />
    if(error) return <p> Error! </p>

    let aggregatedStats = aggregateStats(data)
    let leaderboards = [
        { id: 'topUserAgents', data: aggregatedStats.userAgents.slice(0, 5), title: 'User Agents'  },
        { id: 'topHttpProtocols', data: aggregatedStats.httpProtocols.slice(0,5), title: 'HTTP Protocols'}, 
        { id: 'topTlsVersions', data: aggregatedStats.tlsVersions.slice(0,5), title: 'TLS Versions'},
    ];
    let barCharts = [
        { id: 'topIps', data: aggregatedStats.ips.slice(0, 5), title: 'IP Addresses' },
        { id: 'topHosts', data: aggregatedStats.hosts.slice(0, 5), title: 'Hosts' }, 
    ]

    return (
        <div key={barCharts['topIps']} className="flex justify-start align-stretch m-1 p-2 rounded-md shadow">
            <LeaderboardTableItem 
                data={aggregatedStats.ips.slice(0, 5).data} 
                title="Top IPs"
                type="pie"
            />
        </div>
    )
}

export default LeaderboardTable