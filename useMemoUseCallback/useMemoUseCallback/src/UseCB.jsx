import React, { useMemo, useState, useCallback } from "react";

//what is useCallBack?
//have a list of names and can sort them. let's make a sorting func
//the sortedList depends on a list, so give it that dep array
function SortedList({list}){
    const sortedList = useMemo(()=>
    {
        return [...list].sort()}, [list, sortFunc]);
    return <div>{sortedList.join(", ")}</div>
}

//the sortFunc is ugly, lots of re-renders being triggered
//how can we stabilize the ref to this sort func to stop all of the re renders?
//pull it out of the func entirely and put it out as a global var
//but then ew, it's a global var. ugly and sitting there inefficiently
// const sortFunc = (a, b) => a.localeCompare(b);
//better way to use useCallback
function UseCB(){
    const [names] = useState(["Styker", "Izzy", "Tiger", "Spanky"])
    //can put a sorting helper func in here
    //could mult b by -1 and get the inverse, reverse abc order!
    //we can put this func back in here, wrapped in a useCallback
    //why? to keep it from being triggered to sort every time our counter is clicked!
    //it takes an empty dep arr bc we are not using any data in this func!
    //using useCallBack and empty dep arr will make sure that we only EVER create sort func once!
const sortFunc = useCallback((a, b) => a.localeCompare(b), []);
//OR                for a rev sort!
// const sortFunc = useCallback((a, b) => a.localeCompare(b) * -1, []);

    return (

            <><h1>Info about useCallBack</h1>
            <SortedList list={names} sortFunc={sortFunc}/></>
    )
}
export default UseCB
//when should you use useCallBack?
//if the CB you're creating like onClick or onChange or whatever is going onto a nested comp!
//it stabilizes refs that you send to a React comp!
//simple input, don't need useCB/onchange
//              ALSOOOOOOOOOOOOO
//use useCB if you are creating a custom hook. anytime you craete a CB in a custome hook, use CB to do it
//you can make sure that the ref to the comp is stable over time!