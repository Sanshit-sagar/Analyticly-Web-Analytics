import { useMemo } from 'react' 


const getColumns = (key) => {
    if(!key || !key.length) {
        return null; 
    }
   
    // cols for allViews 
    const allViewsColumns = useMemo(() => [
        {
            Header: 'Slug',
            accessor: `slug`,
        },
        {
            Header: 'Destination URL',
            accessor: `destination`,
            width: 75,
        },
        {
            Header: 'Location',
            accessor: `geodata`,
            width: 75,
        },
        {
            Header: 'Coordinates',
            accessor: `coordinates`,
            width: 75,
        },
        {
            Header: 'IP Address',
            accessor: `ip`,
        },
        {
            Header: 'Host',
            accessor: `host`,
        },
        {
            Header: 'Browser',
            accessor: `browser`,
        },   
        {
            Header: 'Engine',
            accessor: `engine`,
        },
        {
            Header: 'OS',
            accessor: `os`,
        },
        {
            Header: 'Time Taken',
            accessor: `timeTaken`,
        },
        {
            Header: 'Timestamp',
            accessor: `datetime`,
        },
    ], []);

    const mostViewedPagesColumns = useMemo(() => [
        {
            Header: 'Slug',
            accessor: `slug`,
        },
        {
            Header: 'Views',
            accessor: `views`,
            width: 75,
        },
    ], []);
    
    const uniqueVisitorsColumns = useMemo(() => [
        {
            Header: 'IP Address',
            accessor: `ip`,
        },
        {
            Header: 'Views',
            accessor: `views`,
        },
    ], []); 

    const allLinksColumns = useMemo(() => [
        {
            Header: 'Slug',
            accessor: `slug`,
        },
        {
            Header: 'Destination',
            accessor: `destination`,
        },
        {
            Header: 'Created At',
            accessor: `datetime`,
        },
        {
            Header: 'Expires At',
            accessor: `ttl`,
        },
        {
            Header: 'Life Remaining',
            accessor: `lifeleftPct`,
        },
        {
            Header: 'Routing Status',
            accessor: `routingStatus`,
        },
        {
            Header: 'Password',
            accessor: `password`,
        },
        {
            Header: 'Blacklist',
            accessor: `blacklist`,
        },
        {
            Header: 'SEO Tags',
            accessor: 'seoTags'
        },
    ], []); 



    if(key==='mostViewedPages') {
        return mostViewedPagesColumns;
    } else if(key==='allViews') {
        return allViewsColumns; 
    } else if(key==='uniqueVisitors') {
        return uniqueVisitorsColumns;
    } else if(key==='allLinks') {
        return allLinksColumns;
    }

    return null; 
}

export default getColumns 