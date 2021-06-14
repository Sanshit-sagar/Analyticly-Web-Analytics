import useSWR from 'swr'
import {useSession} from 'next-auth/client'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function PageViewsStats({ currentHash }) {
  const [session, loading] = useSession()
  // const pathname = currentHash
  currentHash = 'AXsEdFQV9vRKuCcw2ZIoqbsqN3og3s6W'
  // const { data, error } = useSWR((session && !loading && !statusLoading ? `/api/hash/info/${currentHash}`) 
  // null, fetcher)

  // if(!data && !error) return <p> loading... </p>
  // if(error) return <p> {error.message} -- {slug} </p>  
  
  return (
      <>
        { currentHash && currentHash.length ? 
          ( 
            <div style={{ width: '450px' }}>
              <dl className="mt-5 grid grid-cols-1 rounded-md bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
                <dt className="text-base font-normal text-gray-900">
                    { currentHash && currentHash.length ? `Hash: ${currentHash}` : `Publish a public hash to see the view count` }
                </dt>
                
                <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                  <div className="flex items-baseline text-xl font-semibold text-indigo-600">
                    { currentHash && currentHash.length ? currentHash : 'N/A' }
                  </div>
                </dd>
              </dl>
            </div>
          ) :  <p> ...loading </p>
          }
    </>
  )
}

export default PageViewsStats