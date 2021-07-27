import { CheckIcon } from '@heroicons/react/solid'

const steps = [
  { id: '1', name: 'Details', href: '#', status: 'complete' },
  { id: '2', name: 'Analytics', href: '#', status: 'progress' },
  { id: '3', name: 'Settings;', href: '#', status: 'incomplete' },
  { id: '3', name: 'Settings;', href: '#', status: 'incomplete' },
]; 

const NewSlugSteps = () => {

  return (
    <Box css={{ width: '100%', maxWidth: 300, margin: '0 15px' }}>
      
      <Text css={{ fontWeight: 500 }}>
        Radix Primitives
      </Text>
      
      <Separator css={{ margin: '15px 0', width: '100%' }} />

      <nav aria-label="New">
        <ol className="border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0">
          {steps.map((step, stepIdx) => {

            return ( 
                <li key={step.name} className="relative md:flex-1 md:flex">
                  {step.status === 'complete' ? (
                    <a 
                      href={step.href} 
                      className="group flex items-center w-full"
                    >
                      <span className="px-6 py-4 flex items-center text-sm font-medium">
                        <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800">
                          <CheckIcon className="w-6 h-6 text-white" aria-hidden="true" />
                        </span>
                        <span className="ml-4 text-sm font-medium text-gray-900">{step.name}</span>
                      </span>
                    </a>
                  ) : step.status === 'current' ? (
                    <a 
                      href={step.href} 
                      className="px-6 py-4 flex items-center text-sm font-medium" 
                      aria-current="step">
                        <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-indigo-600 rounded-full">
                          <span className="text-indigo-600">
                            {step.id}
                          </span>
                        </span>
                        <span className="ml-4 text-sm font-medium text-indigo-600">
                          {step.name}
                        </span>
                    </a>
                  ) : (
                    <a 
                      href={step.href} 
                      className="group flex items-center"
                      aria-current='nahi hain,'
                    >
                      <span className="px-6 py-4 flex items-center text-sm font-medium">
                        <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                          <span className="text-gray-500 group-hover:text-gray-900">{step.id}</span>
                        </span>
                        <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                          {step.name}
                        </span>
                      </span>
                    </a>
                  )}
                </li>
              );
            })};
        </ol>
      </nav>
    </Box>
  );
}

export default NewSlugSteps 