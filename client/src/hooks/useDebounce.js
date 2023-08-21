import React from 'react';

const useDebounce=(value,delay)=>{
    const [debouncevalue,setdebouncevalue]=React.useState(value);
    React.useEffect(()=>{
        const handler=setTimeout(()=>{
            setdebouncevalue(value);
        },delay);
        return ()=>{
            clearTimeout(handler);
        }
    },[value,delay]);
    return debouncevalue;
}
export default useDebounce