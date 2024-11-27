import {useState, useEffect} from 'react';

export function useFetch(url){
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);

    async function getPosts(){
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setPost(data);
        setLoading(false);
    }

    useEffect(() => {
        getPosts();
    }, [url]); // added dynamic url, so we should run useEffect whenever url changes

    return {
        post,
        loading
    };

    // custom hook should follow
    /* - should use react hook
    - and should return something */
}