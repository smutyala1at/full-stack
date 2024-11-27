import {useRef, useEffect} from 'react';

export function usePrev(value){
    const ref = useRef({}); // initialises on first call, and then this is ignored on subsequent calls

    useEffect(function(){
        ref.current = value;
    }, [value]);

    return ref.current;
} // in react, it returns first, effect gets called later
// when first post is passed as arg on first call, it returns {} and then runs effect, where it sets val to first post

// useEffect is the main key here!