import {useEffect, useRef } from 'react'

function useInterval(callback, delay,flag) {
  
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let id = setInterval(() => {
      if(flag){
        savedCallback.current();
      }else{
        console.log("not updated");
      }
    }, delay);
    return () => clearInterval(id);
  }, [delay,flag]);  
}

export default useInterval;