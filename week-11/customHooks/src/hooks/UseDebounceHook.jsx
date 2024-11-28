import { useState, useEffect } from 'react';

export function useDebounce(value, delay){
    const [debouncedVal, setDebouncedVal] = useState("");

    useEffect(function(){
        const clockRef = setTimeout(function(){
            console.log("searching backend....")
            setDebouncedVal(value);
        }, delay * 1000);

        return function(){
            clearTimeout(clockRef)
        }
    }, [value]);

    return debouncedVal;
}