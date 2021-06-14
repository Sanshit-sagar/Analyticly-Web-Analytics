
import React, { useState, useEffect, useRef } from 'react';
import useSWR from 'swr'
import fetcher from '../../lib/utils'

const UrlInput = () => {

    return (
        <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2">
                    <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                        Destination URL
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            http://
                        </span>
                        <input
                            type="text"
                            name="company_website"
                            id="company_website"
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                            placeholder="www.example.com"
                        />
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function InputForm() {
    return (
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
            <UrlInput /> 
        </div>

        <div className="bg-gray-50 px-4 py-4 sm:px-6">

        </div>
      </div>
    )
  }

export default InputForm  