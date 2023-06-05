import { useState } from 'react'

//for str, nums, bools, we get back a COPY, not the REAL THING,
//so we must use setName
  //can't push new name onClick with onAddName. need to change the state which will re-render. setName will not only set the name, it will enqueue a re-render rew for this comp
  //we are passing a ref for React to the arr with useState
  //React then holds not the arr data, but a ref to the data
  //we then can use an in place command to mutate the data of that arr in place
  //our setter enqueues the req, how do we force the re-render?
  //give it the same list back. 
  //when we call any setter when it comes to useState, it looks at the old val and the new val. if old and new are same, React says, cool, but I dont care
  //here we are giving it the same ref it had before, so React really doesn't care
  // const onAddName = () =>{
  //   list.push(name);
  //   setList(list)
  //   }
  //same ref= same arr. no enquque re-render
  //so mutate the arr, give it a new, and grab the REST and add them in
  //setters are batched. 
//useState can also take a func as an initial val
//  const [name, setName] = useState(() => "Jack")
//above would init it to Jack, kind of like a placeholder
function NameList(){
  const [list, setList] = useState(["Jack", "Jill", "John"]);
  const [name, setName] = useState("")
 
  const onAddName = () =>{
  setList([...list, name]);
  setName("")
  }
  return(
    <div>
      <ul>
        {list.map((name) =>(
          <li key={name}>{name}</li>
        ))}
      </ul>
      <input
      type='text'
      value={name}
      onChange={(e) => setName(e.target.value)}
      />
      <button onClick={onAddName}>Add Name</button>
    </div>
  )
}

function Counter() {
let [count, setCount]=useState(10);
//let's make a CB func for when our button is clicked
function addOne(){
  //we must use our lovely setCount func to do:
  setCount(count + 1)
}
  return (
    <div className='App'>
      <button
      onClick={addOne}
      >Count = {count}</button>
    </div>
  )
}
function App(){
  return(
    <div>
      <Counter/>
      <Counter/>
      <NameList/>
      <Counter/>
      <Counter/>
    </div>
  )
}

export default App

//we are writing a counter app to learn useState
//the output of useState is an array. 
//the first val in useState is the current
//the second val in useState is a setter func
//we call that func to set that piece of state
//                STOP AND LEARN
//why can't we do this in our function?
//  count++
//                                  go to notes.ts for a bit
//setting the val of a return ONLY sets your local copy. 
//so scalers-----> str, nums, bool
//a num in this case, is returned and passed by val
//          ARRAYS AND OBJECTS ARE PASSED AND RETURNED BY REF   
//WHEN you return by val, you don't get it, you get a copy of it.
//the count is associated with the inst of this comp
//what if we want multiple counters?!?
//the state is coupled with the instance of the comp. make a 
//bunch of counters like the above and they all indi increment 
//bc they are all diff instances.
//each counter maintains their own states, their own counts

//lets manage arrays. 