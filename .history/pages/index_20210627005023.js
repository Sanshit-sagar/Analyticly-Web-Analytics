import React from 'react'
import Head from 'next/head'

import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { fetchAndWait } from 'lib/fetchWrapper'
import { toast, ToastContainer } from 'react-hot-toast'

import Loader from '../components/Loader'
import StackedLayout from '../sections/StackedLayout'

const emphasize = (needsEmph) => {
  return (
    <span className="text-brand-700"> 
      {needsEmph}
    </span> 
  );
}

const LandingPage = () => {
    const router = useRouter()
    const [session, loading] = useSession();

    return (
      <div className="flex flex-col min-h-screen items-center bg-gray-800 relative overflow-y-hidden">
   
        <div
          className="absolute top-8 sm:-top-16 -left-40 sm:-left-36 xl:-left-36 w-full sm:w-2/3 transform rotate-6 bg-gray-900 shadow-xl"
          style={{ height: '150vh'}}
        />
        
        <div className="min-h-screen sm:min-h-full lg:min-h-screen items-center sm:py-0 grid grid-cols-12 gap-x-4 container px-10 sm:px-20 xl:px-28 mx-auto z-10 flex-col-reverse sm:my-56 lg:my-0">
          <div className="row-start-2 lg:row-start-1 col-span-12 lg:col-span-6 relative">
            <div className="mb-10">
              <div className="flex items-center mb-5">
                <h1 className="text-white text-3xl xl:text-5xl leading-snug">
                    Get {emphasize("realtime insights")} into your URLs
                </h1>
              </div>

              <p className="text-white sm:w-auto text-lg xl:text-xl">
                  Making URL Analytics EDGEy again
              </p>
            </div>

            <div className="mb-10">
              <div className="container h-full w-full bg-gray-50 border-black">
                  <h2> { session && session.user ? `Welcome ${session.user.name}` : 'Log in to continue'} </h2>
                  <button onClick={() => router.push(session && session.user ? '/auth/signout' : '/auth/signin')}>
                    {  loading ? <Loader /> 
                    :  session && session.user 
                    ? 'Logout' : 'Login'}
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

// USE THESE TO HIGHLIGHT FEATURES
       {/* Featured Organizations */}
//        <div className="w-full z-10 px-10 sm:px-20 xl:px-28 container mx-auto -mt-24 sm:-mt-32">
//        <p className="text-white">Explore organizations</p>
//        <div className="mt-8 mb-24 grid grid-cols-12 gap-x-0 sm:gap-x-4 lg:gap-x-8 gap-y-8">
//          {featuredOrganizations.map(org => (
//            <OrgFeatureCard key={org.id} org={org} />
//          ))}
//        </div>
//      </div>
//    </div>
//  </>
  
const Home = () => {
    const router = useRouter()
    const [session, loading] = useSession()

    var landingPageMetadata = {
      title: 'cute.ly',
      description: 'More than just another URL Shortener'
    }; 

    return (
      <>
        <Head>
          <title> cute.ly </title>
          <meta property="og:title" content="cutely" key="title" />
          <script defer  src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "d08fc063d1064064af71f7ac09369e34"}' />
          
          <link rel="stylesheet" href="https://leeoniya.github.io/uPlot/src/uPlot.css" />
          <script src="https://leeoniya.github.io/uPlot/dist/uPlot.iife.min.js" />
        </Head> 
        
        <StackedLayout 
          pageMeta={landingPageMetadata}
          children={<LandingPage />}
        />
      </>
    );
}

// FETCH LATEST 250 GLOBAL COMMENTS HERE 

// export async function getStaticProps() {
//   const featuredOrganizations = await Promise.all(
//     featuredOrgNames.map(org => fetch(
//       `https://api.github.com/orgs/${org}`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           'Authorization': `bearer ${githubAccessToken}` 
//         }
//       }
//     ).then(res => res.json()))
//   )
//   return {
//     props: { featuredOrganizations }
//   }
// }


export default Home
