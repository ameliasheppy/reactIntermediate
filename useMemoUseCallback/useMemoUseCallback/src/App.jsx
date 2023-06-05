import { useMemo, useState } from 'react'
import './App.css'
import UseCB from './UseCB'
              //      why use useMemo? 1...When you have an expensive calc that you don't want to run on every re-render
              //      2.....useMemo when you want the result to be an arr or an obj!
//why not to use useMemo? simple calcs---> adding two nums together. 
//don't use it to add two nums bc that is a simple op and it results in a scaler
//see the total counter that shows an easy way to do a calc with no useMemo
//useMemo is the same as use a calculated value

  //imagine the arr is thousands of vals! we don't want to calc that on every re-render.
  //we only want to add the nums if something changes. so let's useMemo    AKA                  useCalculatedVal
//need to give the useMemo a dep array. it tricks people! 
//think of it this way. 
//  ANYTHING THAT YOU READ FROM SHOULD GO INTO THE DEP ARR
//we are reading from numbers, so put numbers in the dep arr

//other time to useMemo. when we are cal'ing a val and it might take a while
//any complex calc. 
// our numbers arr may be super huge, so use useMemo for when we have a complex calc that we don't want to do on every re-render
//also use it when creating an arr or obj.
//bc React compares arrays  and objs by refs.
//so to stabilize arrs, useState!

//Myths about useMemo= is that it is somehow connected to React memo. They are in no way related.
//useMemo is like returnCalculatedValue.   
//React memo memoizes components and is a perf enhancer.
//Myth: useMemo is a perf killer. with classic CS memoization, you memoize a func and then that mem'd func remembers every single set of params and only calcs new vals if a change. otherwise, it sends back a val from a cache that it is and that cache can be super huge and crazy. 
//the potential nums of params can be huge and crash mem.
//useMemo does a calc-is the dep arr the same as the last time that I saw it?
//no perf or mem hit with useMemo


function App() {
  const [numbers] = useState([10,20,30])
  //could use a reduce to add all of the nums in successtion,
  //return the  new acc and it's our total
  const total = numbers.reduce((acc, number) => acc + number, 0)
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)

  const countTotal = count1 + count2
  const memoTotal = useMemo(() => numbers.reduce((acc, number) => acc + number, 0), [numbers])

  const [names] = useState(["James", "Greggy", "Ben", "Nick", "Steve"])
  //now lets sort them in place
  //sort is mutating names in place. then gives us a ref to names, but it is already sorted, so how can we sort but leave the original unchanged?
  //copy names before we sort it
  //every time the comp re-renders, it will run the sort, we don't want that. soooo useMemo! this will DEPEND ON NAMES, SO NAMES IS THE DEP ARRAY
  const sortedNames = useMemo(() => [...names].sort(), [names])

  return (
  <div>
    <h1>useMemo aka useCalculatedValue: {memoTotal}</h1>
    <h2>Reducer Total: {total}</h2>
    <h2>Names to sort: {names.join(', ')}</h2>
    <h2>Done! {sortedNames.join(', ')}</h2>
    <button onClick={()=> setCount1(count1 + 1)}> Count1: {count1}</button>
    <button onClick={()=> setCount2(count2 + 1)}> Count2: {count2}</button>
    <div>Total: {countTotal}</div>
    <UseCB />
  </div>
  )
}

export default App

