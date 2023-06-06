import React, { useState, useEffect } from "react";

function StopWatch(){
    const [time, setTime] = useState(0)

    //we need a setInterval. It would be an inf loop to just set it to that
    //let use useEffect
    //with a [] bc we only want for this interval to be created once!
    //but, it is only running once, and then stopping
    //below, we are creating a closure and capturing time at 0
    //so now, inside of this func, time is forever locked at 0
    //we could add time in as a dep in the [] 
    //      BUT THAT WOULD BE INF LOOP
    //so lets use a secondary way to call a setter on useState
    //one way is to just give it the new val
    //another way is to give it a func. 
    //when we give it a func, the return is whatever the new val is. 
    //here, that new val from the func would be time +1
//dont get conf. time is captured by the func. t is just the current val
    useEffect(()=>{
        const interval = setInterval(() => {
            setTime((t) => {return t + 1});
        }, 1000)
        return () => clearInterval(interval)
    }, [])
    return (
        <div>Time: {time}</div>
    )
}

export default StopWatch