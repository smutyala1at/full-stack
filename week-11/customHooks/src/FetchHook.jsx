import {useState, useEffect, useRef} from 'react';

export function useFetch(url, retryTime){
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const timerRef = useRef(null);

    async function getPosts(){
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setPost(data);
        setLoading(false);
    }

    useEffect(() => {
        // on mount, run getPosts immediately
        getPosts();

        // and start the clock
        timerRef.current = setInterval(getPosts, retryTime * 1000);

        return function(){
            clearInterval(timerRef.current);
        }
    }, [url]); // added dynamic url, so we should run useEffect whenever url changes. also runs on mount first


    return {
        post,
        loading
    };

    // custom hook should follow
    /* - should use react hook
    - and should return something */
}