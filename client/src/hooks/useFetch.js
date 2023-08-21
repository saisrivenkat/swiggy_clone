import React, { useEffect, useState } from 'react';

const useFetch=(url,dependency)=>{
    const [res,setres]= useState([])
    const[loading,setloading] = useState(true)
    const[error,seterror] = useState()
    useEffect(()=>{
        const fetch=async()=>{
            const fetch_data = await fetch(url);
            const data = await fetch_data.json()
            setres(data);
            setloading(false);
            
        }
        fetch()
    },[dependency,url])
    return {res,loading,error}
 }
 export default useFetch;