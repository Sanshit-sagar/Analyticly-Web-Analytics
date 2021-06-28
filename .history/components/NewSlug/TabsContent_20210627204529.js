import React, { useContext, useState, useEffect } from 'react'
import { GlobalStore } from '../../store'

const ExpirationSelector = () => {
    const state = useContext(GlobalStore.State)
    const dispatch = useContext(GlobalStore.Dispatch)

    return (
        <div>
            <div className="flex justify-between">
                <label htmlFor="email" className="block text-sm font-extralight text-gray-600">
                    Expiration (TTL)
                </label>
                <span className="text-sm font-extralight text-gray-600" id="email-optional">
                    Optional
                </span>
            </div>
            <div className="mt-1 font-extralight text-gray-600">
                <input
                    value={state.ttl}
                    onChange={(event) => {
                        dispatch({
                            type: 'update_ttl',
                            payload: {
                                value: event.target.value
                            }
                        })
                    }}
                    type="datetime-local"
                    name="expiry"
                    id="expiry"
                    className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="MM/DD/YYYY"
                    aria-describedby="expiry-optional"
                />
            </div>
        </div>
    )
}

export default ExpirationSelector 