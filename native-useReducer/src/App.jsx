import { useState, useReducer } from 'react'
import './App.css'

function UserForm(){
  const [state, dispatch] = useReducer((state, action) =>{
    return {
      ...state,
      ...action,
    }
  }, {
    first: "",
    last: "",
  })
  return (
    <><div>
      <input type="text" value={state.first}
        onChange={(e) => dispatch({ first: e.target.value })} />

      <input type='text' value={state.last}
        onChange={(e) => dispatch({ last: e.target.value })} />
    </div>
    <div>First: {state.first}</div>
     <div>Last: {state.last}</div>
    </>
  )
}
//here is what we happening:
//we have an input field. it has the current name on it
//every time we get a change event, that tells us we have new text
//we dispatch to the reducer function
//a type of SET_NAME and the payload that then gets given to curr state
// which we know is going to be the names array
//and the action, the set_name creates a new obj with the name in it.
//look at it from scalers and references: 
//say we don't want to do that. just use state. nope, it wont work!
//react is looking at the ref that comes out of useReducer. and it says, hey this matches the existing ref, so it cant compare contents
//we  HAVE TO CREATE A NEW OBJ AND THEN MUTATE THE FIELDS WE WANT TO MUTATE

//HOW CAN THEY ADD TO IT? A NEW CASE!!!!!! WITH A NE OBJ, AND THE CURRENT ARRAY WITH THE OTHER STUFF IN IT 
//so now our payload will have more that just one name in it, also, resetting the name when the new one is sent with name: ""

//check it out! we can mutate multiplate at a time!
function NameList() {
  const [count, setCount] = useState(0)
//go to workbook.ts to read the notes on useReducer!
//we want to start off with an empty [] for our  reducer
//and the current name, so let's put an empty str ""
//so we are starting off with this as our initial state, what is in the obj
//we useReducer also returns a dispatch, which will invoke the reducer func we will add
//action has a type on it, use the type in a switch statement to mutate state and return a new state based on the data you get with that action
//common to use type and payload to describe data
const [state, dispatch] = useReducer((state,action)=>{
  switch(action.type){
    case "SET_NAME":
      return {...state, name: action.payload}
  case "ADD_NAME":
    return {...state, names: [...state.names, state.name], name:""}
  }
},{
  names:[],
  name: "",
})
//the obj right above this is a great ex of how useful reducers can be
//take a complex obj and manage it all from the same place by it's keys
  return (
    <>
    <input type="text" value={state.name}
    onChange={e=> dispatch({type:"SET_NAME", payload:e.target.value})}
    />
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
   
     <div>Name ={state.name}</div>
     <button onClick={() => dispatch({type:"ADD_NAME"})}>Add name!</button>
     {state.names.map((name, index) => (
      <div key={index}>{name}</div>
     ))}
    </>
  )
}
function App(){
  
  return (
    <div>
    <UserForm/>
    <NameList/>
    </div>
  )
}

export default App
