import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export const Redirect = () => {
    const [message, setMessage] = useState('Redirecting to another page...')

    const { shortLink } = useParams();    

    const redirectPage = async () => {
        const data = await fetch(`http://localhost:4000/${shortLink}`);

        const response = await data.json();

        if(response.ok){
            return window.location.href = response.redirectTo;
        }
        setMessage('Page not found on our data-base')
    };
    useEffect(()=>{
        redirectPage();
    },[])

    return (
        <div>{message}</div>
    )
}
