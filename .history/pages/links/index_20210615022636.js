import useSWR from 'swr'
import fetcher from '../../lib/utils'
import { useSession } from 'next-auth/client'
import { Layout } from '@/sections/index';

const useListOfSlugs = () => { 
    const [session, loading] = useSession()
    const email = session && !loading ? session.user.email : ''
    const { data, error } = useSWR(email.length ? `/api/slugs/list` : null, fetcher);

    return {
        links: data ? data.slugs : null,
        loading: !data && !error,
        error
    };
}

const useUserCollectionSize = (uid) => {
    const {data, error} = useSWR(uid.length ? `/api/slugs/user-links/${uid}` : null, fetcher)

    return {
        numLinks: data ? data.userLinks : null,
        loading: !data && !error,
        error   
    };
}

const useUserClickStreamSize = (uid) => {
    const {data, error} =  useSWR(uid.length ? `/api/slugs/user-views/${uid}` : null, fetcher)

    return {
        numViews: data ? data.userViews : null,
        loading: !data && !error,
        error
    }
}

const UserStatistics = ({ uid }) => {
    // const numLinks = links ? Object.entries(links).length : 0
    const {numViews, nvLoading, nvError} = useUserClickStreamSize(uid)
    const {numLinks, nlLoading, nlError} = useUserCollectionSize(uid) 
    

    const stats = [
        { name: 'Num Links', stat: numLinks ? numLinks : nvLoading ? '...' : 'error'},
        { name: 'Num Views', stat: numViews ? numViews : nlLoading ? '...' : 'error'},
      ]

    return (
        <div>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {stats.map((item) => (
                    <div key={item.name} className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">
                            {item.name}
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">
                            {item.stat}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )
  }

const LinkEntry = ({ link, index }) => {
    const slug = link[0]

    const {data, error} = useSWR(`/api/slugs/views/${slug}`, fetcher)

    return (
        <>
            <td class="border border-green-600"> {index} </td>
            <td class="border border-green-600"> {JSON.parse(link[1]).slug} </td> 
            <td class="border border-green-600"> {JSON.parse(link[1]).url.substring(0, 25)} </td> 
            <td class="border border-green-600"> {JSON.parse(link[1]).user} </td> 
            <td class="border border-green-600"> {JSON.parse(link[1]).timestamp} </td> 
            <td class="border border-green-600">
                { 
                    !data && !error ? <p> ... </p> 
                    : error ? <p> !!!! </p> 
                    : <p> {data.views} views </p> 
                }
            </td>
        </>
    )
}

const TabulatedLinks = ({ links }) => {
    const [session, loading] = useSession()

    return (
        <table class="border-collapse border border-green-800 ...">
            <thead>
                <tr>
                    <th class="border border-green-600"> ID </th> 
                    <th class="border border-green-600"> Slug </th>
                    <th class="border border-green-600"> Destination URL </th>
                    <th class="border border-green-600"> Owner </th>
                    <th class="border border-green-600"> Created At </th>
                    <th class="border border-green-600"> Views </th>
                </tr>
            </thead>

            <tbody>
                {Object.entries(links).map(function(value, index, array) {
                    return (
                        <tr key={index}>
                            {session && !loading && JSON.parse(value[1]).user===session.user.email ?
                                
                                <LinkEntry link={value} index={index} /> : null 
                            }
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

const Links = () => {
    const { links, loading, error } = useListOfSlugs()
    const [session, userLoading] = useSession()

    const uid = session && !userLoading ? session.user.email : ''

    return (
        <Layout>
            <section className="text-center pt-12 sm:pt-24 pb-16">
                <h2 className="text-4xl sm:text-7xl font-bold capitalize">
                    My Links
                </h2>
            </section>

            {/* <UserStatistics uid={uid} />  */}

            { 
                    loading ? <p> loading... </p> 
                :   error   ? <p> error...   </p>
                :   <TabulatedLinks links={links} />
            }

        </Layout>
    );
};


export default Links;