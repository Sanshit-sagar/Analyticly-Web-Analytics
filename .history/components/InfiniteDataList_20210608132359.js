import Card from './Card';
import CardSkeleton from './CardSkeleton';
import toast from 'react-hot-toast';
import useInfiniteQuery from '../hooks/useInfiniteQuery';

import { useRef, useEffect } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { isInViewport } from '../lib/utils';
import { useDebouncedCallback } from 'use-debounce';

// const InfiniteDataList = ({ queryKey, initialData }) => {
//   const moreRef = useRef();

//   const {
//     data,
//     error,
//     hasNextPage,
//     fetchNextPage,
//     isFetchingInitialData,
//     isFetchingNextPage,
//   } = useInfiniteQuery(queryKey, initialData);

//   const loadMore = useDebouncedCallback(() => {
//     if (isInViewport(moreRef.current)) {
//       fetchNextPage();
//     }
//   }, 500);

//   // Fetch more data when scrolling to the end of the list
//   useEffect(() => {
//     window.addEventListener('scroll', loadMore);

//     return () => {
//       window.removeEventListener('scroll', loadMore);
//     };
//   }, []);

//   // Something went wrong
//   if (error) {
//     toast.error('Unable to fetch data...');
//   }

//   // Fetching done and no data to render
//   if (!isFetchingInitialData && data?.length === 0) {
//     return (
//       <div className="flex justify-center">
//         <p className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md w-full max-w-screen-sm text-center text-lg flex justify-center items-center space-x-1">
//           <ExclamationCircleIcon className="w-6 h-6 flex-shrink-0" />
//           <span>No blog posts yet!</span>
//         </p>
//       </div>
//     );
//   }

//   // Render data grid + skeletons when fetching more data
//   return (
//     <div>
//       <div className="grid sm:grid-cols-2 gap-8 max-w-screen-lg mx-auto">
//         {data?.map(item => (
//           <Card key={item.id} {...item} />
//         ))}

//         {isFetchingNextPage
//           ? [...new Array(10)].map((_, i) => <CardSkeleton key={i} />)
//           : null}
//       </div>

//       {hasNextPage ? (
//         <div ref={moreRef} />
//       ) : (
//         <p className="text-gray-500 text-center text-lg mt-20">
//           No more data...
//         </p>
//       )}
//     </div>
//   );
// };

const InfiniteDataList = ({ queryKey, initialData }) => {
    const { data, error } = useSWR('/api/posts', fetcher)

    if(!data && !error) return <p> Loading... </p>
    if(error) return <p>Error! </p>

    return (
        <div> 
            <h1> hehehe </h1>
            <subtitle> yeyeye </subtitle>
            <p> {JSON.stringify(data)} </p>
        </div>
    )   
}

export default InfiniteDataList;