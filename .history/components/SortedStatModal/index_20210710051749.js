
import React from 'react'
import Link from 'next/link'

import { useTable, useSortBy } from 'react-table'
import styled from 'styled-components'

import useSWR from 'swr'
import axios from 'axios'
import Loader from '../Loader/index'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

const fetcher = url => axios.get(url).then(res => res.data)

function useUserClickstreams(email)  {
    const time = 30;
    const { data, err } = useSWR(email && email?.length ? [`/api/stream/users/${email}?time=${time}`, time] : null, fetcher)

    return {
        clickstream: data ? data.clickstream : [],
        loading: !data && !err,
        error: err
    };
}

// const useAggregatedUserAgentStats = (email, userAgents) => {
//     const { data, error } = useSWR(email && email.length && userAgents && userAgents.length ? `/api/user-agent/aggregate/${email}?userAgents=${userAgents}` : null, fetcher)

//     return {
//         sua: data && data.sua && data.sua.length ? {
//             engines: Object.entries(data.sua.sortedEngines),
//             browsers: Object.entries(data.sua.sortedBrowsers),
//             osNames: Object.entries(data.sua.sortedOsNames),
//          } : null,
//         suaLoading: !data && !error, 
//         suaError: error
//     }
// }


const StatisticTable = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({ columns, data },  useSortBy );

    const firstPageRows = rows.slice(0, 10)

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(group => (
                        <tr {...group.getHeaderGroupProps()}>
                            {group.headers.map(column => {
                                return (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted? column.isSortedDesc ? ' 🔽' : ' 🔼'  : ''}
                                        </span>
                                    </th>
                                ); 
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {firstPageRows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <br />
            <div>Showing the first {firstPageRows.length} results of {rows.length} rows</div>
        </>
    );
}

const SortedStatModal = () => {
    const email = 'sasagar@ucsd.edu'
    const { clickstream, loading, error } = useUserClickstreams(email)

    const columns = React.useMemo(() => [
        {
            Header: 'Key',
            accessor: `key`,
            Cell: ({ value }) => {
                return (
                    <Link href={value}>
                        {`${value.substring(0,5)}`}
                    </Link>
                ); 
            },
            width: 75,
        },
        {
            Header: 'Slug',
            accessor: `slug`,
        },
        {
            Header: 'Destination URL',
            accessor: `destination`,
            Cell: ({ value }) => {
                return (
                    <Link href={value && value.length ? value : '/'}>
                        {value && value?.length ? `${value.substring(0,20)}...` : '-'}
                    </Link>
                ); 
            }
        },
        {
            Header: 'Country',
            accessor: `geodata.country`,
            width: 75,
        },
        {
            Header: 'City',
            accessor: `geodata.city`,
            width: 75,
        },
        {
            Header: 'Postal Code',
            accessor: `geodata.postalCode`,
            width: 75,
        },
        {
            Header: 'IP Address',
            accessor: `visitor.ip`,
        },
        {
            Header: 'Host',
            accessor: `visitor.host`,
        },
        {
            Header: 'User Agent',
            accessor: `visitor.system`,
        },   
        {
            Header: 'Accessed at',
            accessor: `timestamp`,
            Cell: ({ value }) => {
                let timestamp = parseInt(value);
                let localeTime = new Date(timestamp).toLocaleTimeString();
                let dateString = new Date(timestamp).toDateString();
                return (
                    <span> {`${localeTime}, ${dateString}`} </span>
                );
            }
        },
        {
            Header: 'Time taken',
            accessor: `misc.timeTaken`
        }, 
    ], []);

    if(loading) return <Loader />
    if(error) return <p> {`Error: ${error.message}`} </p>
    
    return (
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <Styles>
                    <StatisticTable columns={columns} data={clickstream} />
                </Styles>
            </div>
        </div>
    )
}

export default SortedStatModal 