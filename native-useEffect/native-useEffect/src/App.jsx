import './App.css';
import { useState, useEffect } from 'react';
import StopWatch from './StopWatch';
//useEffect is often the culprit of infinite loops in our React apps.
//useEffect is pretty commonly used to make API reqs
//we made our own little API in the public folder with people
//uh oh, this will be an inf loop bc it is running over and over in an inf loop
//stop this with useEffect
//useEffect will tell the DOM, don't do this right away. hold it, and then call it whenever when the dep arr changes
//start with an [] for dep array bc it 
//in React 18, when strict mode is on, it mounts, and then unmounts and then remounts. thus, everything calls useEffect twice and so everything happens twice with React 18
//remove strict mode to stop it. 
//but it only happens in dev mode, not prod mode

//lets map the names into buttons so that when clicked it will 
function App() {
//define the data we want to work with
const[names, setNames] = useState([]);
//get the data to populate the array:
useEffect(() => {
  fetch("/names.json")
.then((response) => response.json())
.then((data) => setNames(data));
}, [])

// const [selectedName, setSelectedName] = useState(null) 
//place to store that name data from the below fetch
const [selectedNameDetails, setSelectedNameDetails] = useState(null);
// //when we click the button, we want to set the selectedName to our choice instead of null
// //now we only want to get the data for that name, use a str temp lit
// useEffect(() =>{
//   //dont want null.json. so bracket this off to only grab data if there is data
//   if(selectedName){
//   fetch(`/${selectedName}.json`)
//   .then((response)=> response.json())
//   .then((data) => setSelectedNameDetails(data))
//   }
// }, [selectedName])
//need to use json.stringify
//              BUT THE BETTER WAY TO DO IT IS WITH A CALLBACK
const onSelectedNameChange = (name) =>{
  fetch(`/${name}.json`)
  .then((response)=> response.json())
  .then((data) => setSelectedNameDetails(data))
}
return (
    <div>
      <StopWatch />
      <h2>Names: {names.join(", ")}</h2>
      <div>
        {names.map((name) => <button
        onClick={() => onSelectedNameChange(name)}
        >{name}</button>)}
      </div>
<div>{JSON.stringify(selectedNameDetails)}</div>
    </div>
  )
}

export default App


//when does useEffect get a little hairy? when you are dealing with data that will change
//lets make a stop watch component

//the func that we give useEffect can run a cleanup func 
//the cleanup will run whenever all of these effects are gotten rid of
//so we can clear our interval in the StopWatch
//useEffect can be understood, use it a lot! You'll get good at it!