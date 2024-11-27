import {useState, useEffect} from 'react';

export function useFetch(url){
    const [post, setPost] = useState({});

    async function getPosts(){
        const response = await fetch(url);
        const data = await response.json();
        setPost(data);
    }

    useEffect(() => {
        getPosts();
    }, []); // empty dependency === execute on mount

    return post;

    // custom hook should follow
    /* - should use react hook
    - and should return something */
}