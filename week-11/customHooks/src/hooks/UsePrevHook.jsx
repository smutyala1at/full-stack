import {useRef} from 'react';

export function usePrev(value){
    const ref = useRef({ latest: value, previous: "" }); // initialises on first call, and then this is ignored on subsequent calls

    // using json stringify because when the backend is fetching every 10 seconds, the object reference is changing. using just ===, if condition is passed because JS checks for object references rather than checking if the contents are same
    if(JSON.stringify(ref.current.latest) !== JSON.stringify(value)){ // on first run this condition will be failed, as we initializing latest with props value. Usually on later calls, latest is different than props value so this if condition will be passed, if uneccessary re-renders happen component which holds usePrev hook, then it calls usePrev with prop value which is indeed equal to latest, then this condition will be failed
        ref.current.previous = ref.current.latest
        ref.current.latest = value
    } 

    return ref.current.previous; 
} // in react, it returns first, effect gets called later
// when first post is passed as arg on first call, it returns {} and then runs effect, where it sets val to first post

// useEffect is the main key here!