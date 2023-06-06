import { useState } from 'react';
import './App.css';
import { useRef, useEffect} from 'react';
//useRef is one more way of associtaing state with a comp in React. 
//when you change the val of a ref it doesn't cause a re render
//commonly used to get a ref to an HTMLElement
function App() {
//we want to put focus on the input when it first starts up
const inputRef = useRef(null)

//we need to know the ref is def'd as something
//useEffect can tell us if the comp has rendered and the input can be focused
//only want for this to run once, so give it []
useEffect(()=>{
  inputRef.current.focus()
}, [])
//what is current? when we have a ref, we have a current val asso'd with the ref. 
//MUST DO INPUT.CURRENT 
//current is a thing we can set or read from 
//the primary use of useRef is to get access to elements@
//but we can also do it to maintain state without any updates
const idRef = useRef(1)
const [names, setNames] = useState([
  //we can perfectly use useRef to help with auto incrementing the id on our users when a new name is entered!
  {id:idRef.current++, name:"Nick"},
  {id:idRef.current++, name:"Ben"}
])
const onAddName = () => {
setNames([...names, 
  {id:idRef.current++, name:inputRef.current.value},]);
//reset it to empty when done!
inputRef.current.value = ""
}
//useRef gives us an uncontrolled input 
//we can just reach out and grab the val of the input
//it is the most efficient way to manage an input
//
  return (
<div>
<input type='text' ref={inputRef}/>
<button onClick={onAddName}>Add name</button>
<div>{names.map((name) => (
  <div key={name.name}>{name.id}-{name.name}</div>
))}</div>
</div>
  )
}

export default App
