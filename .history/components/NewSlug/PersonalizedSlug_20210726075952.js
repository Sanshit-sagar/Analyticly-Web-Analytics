import React, { useState, useEffect, useContext } from 'react'
import Loader from '../Loader'

import { InputElementCardWrapper } from './index'; 
import { NewSlugStore } from '../../store'
import { dispatchValidationUpdate } from '../../lib/dispatchers'

import { FormGroup, InputGroup, Button, Switch } from '@blueprintjs/core'
import useSWR from 'swr';
import toast from 'react-hot-toast'

const useNewSlug = () => {
    const { data, error } = useSWR('/api/slugs/new')
    
    return {
        slug: data ? data.slug : undefined,
        loading: !data && !error,
        error
    };
}

const useSlugValidation = (typedSlug) => {
    const { data, error } = useSWR(typedSlug?.length ? `/api/slugs/verify/${typedSlug}` : null)

    return {
        validity: data ? data.isValid : null,
        validityLoading: !data && !error,
        validityError: error,
    } 
}

const PersonalizedSlug = ({ mutate }) => {
    const state = useContext(NewSlugStore.State)
    const dispatch = useContext(NewSlugStore.Dispatch)

    const [doFetch, setDoFetch] = useState(true);
    const [charsRem, setCharsRem] = useState(30);
    const [typedSlug, setTypedSlug] = useState('');
    const [randomSlug, setRandomSlug] = useState('');
    const [isAutogenerated, setIsAutogenerated] = useState(true)

    const handleRefresh = () => {
        setDoFetch(true); 
    }

    const handleInputChange = (event) => {
        if(charsRem===0) {
            toast.error('Slugs cannot be longer than 30 chars')
            return; 
        }
        setIsAutogenerated(false)
        setTypedSlug(event.target.value)
        setCharsRem(30 - typedSlug.length)
        mutate('slug', typedSlug);
        mutate('slugType', 'custom')
    }

    const handleAutogenChange = () => {
        setIsAutogenerated(!isAutogenerated)
    }

    const { slug, loading, error } = useNewSlug();
    const { validity, validityLoading, validityError } = useSlugValidation(typedSlug);

    useEffect(() => {
        if(!loading && !error && doFetch) {
            setRandomSlug(slug);
            mutate('slug', randomSlug);
            mutate('slugType', 'autogenerated')
            setDoFetch(false);
        }
    }, [typedSlug, slug, loading, error, doFetch]);

    useEffect(() => {
        if(error || validityError || (!typedSlug?.length && !randomSlug?.length)) return;

        let validationKey = 'slug'
        let isValidValue = false;

        let currentSlug = isAutogenerated ? randomSlug : typedSlug
        if(currentSlug.length) {
            isValidValue = currentSlug.length > 5 && currentSlug.length <= 30 && !validityError && !error;
        }

        dispatchValidationUpdate({ validationKey, isValidValue, state, dispatch })
        mutate('slug', currentSlug);
    }, [loading, error, validityError, validityLoading, isAutogenerated, randomSlug, typedSlug])

    if(loading) return <Loader />
    if(error || validityError) return <p> Error: {error ? error.message : validityError.message} </p>

    return (
        <div className="w-full flex-col justify-start align-stretch">
            <InputElementCardWrapper
                title="Custom Slug"
                description='Select or type a new Slug for your URL'
                children={
                  
                        <span 
                            style={{ display: 'flex', flexDirection: 'row', justifyContent:'flex-end', alignItems: 'flex-start',

                            }}
                        >
                            <Switch
                                labelElement={"Auto-generated"}
                                innerLabelChecked="on" 
                                innerLabel="off" 
                                checked={isAutogenerated}
                                onChange={handleAutogenChange}
                            />
                        </span>
                        <div style={{ marginTop: '20px', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch' }}>
                            <span style={{ width: '50%', marginLeft: '5px', backgroundColor: isAutogenerated ? `rgba(15,0,255,0.1)` : 'transparent', padding: '7.5px', borderRadius: '3.5px', border: 'thin solid transparent' }}>
                                <FormGroup
                                    helperText="Refresh for a new random slug"
                                    label="Random auto-generated"
                                    labelFor="randomSlug"
                                >
                                    <InputGroup
                                        type="text"
                                        value={randomSlug}
                                        label="Random"
                                        disabled={true} 
                                        rightElement={
                                            <Button 
                                                icon="refresh" 
                                                onClick={handleRefresh} 
                                                disabled={false}
                                                loading={loading} 
                                                intent={error ? "danger" : "success"} 
                                            />
                                        }
                                    />
                                </FormGroup>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                    {isAutogenerated ? 
                                        <span className='text-green-400'> 
                                            Nice choice!
                                        </span> 
                                    : null}
                                </div>
                            </span>
                            <span style={{ width: '50%', marginLeft: '5px', backgroundColor: isAutogenerated ? 'transparent' : `rgba(15,0,255,0.1)`, padding: '7.5px', borderRadius: '3.5px', border: 'thin solid transparent' }}>
                                <FormGroup
                                    helperText={
                                        <span style={{ width: '100%',  display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <span> {`Enter the slug you'd like`}  </span>
                                            <span> Chars: {charsRem}/30 </span>
                                        </span>
                                    }
                                    label="Customized"
                                    labelFor="typedSlug"
                                >
                                    <InputGroup 
                                        type="text"
                                        value={typedSlug} 
                                        onChange={handleInputChange} 
                                        descriptionText={`Chars: ${charsRem}/30`}
                                        minimal={true} 
                                        rightElement={
                                        
                                            <Button 
                                                loading={typedSlug?.length > 5 && validityLoading} 
                                                intent={validity ? 'success' : !validity ? 'danger' : 'none'} 
                                                icon={!validity ? 'error' : validity ? 'tick-circle' : ''}
                                            /> 
                                        }
                                    />
                                </FormGroup>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                    {isAutogenerated ? null :
                                        <span className={validity ? 'text-green-400' : 'text-red-500'}> 
                                            {
                                                  !validityLoading && !validityError 
                                                ? typedSlug.length <= 5 ? 'Too short! Slugs need to be longer than 5 chars' 
                                                : validity ? 'That ones available' : 'Hmmm, that doesnt look like a valid URL'
                                                : 'Enter a valid slug to check if its available'
                                            }
                                        </span> 
                                    }
                                </div>
                            </span>
                        </div>
                    </>
                }
            />
        </div>
    )
}

export default PersonalizedSlug