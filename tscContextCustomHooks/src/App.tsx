import './App.css';

//lets make a search box for the pokemon
//putting the dat for this in the store.tsx
//bring in search and setSearch

//this set of hooks is the underpinnings of state mgmt in React. everything
//else fits on top of it!
//all of the other hooks work on this!
//even redux and stuff work on top of these basic hooks that we covered
function SearchBox(){
  const {search, setSearch} = usePokemon();
  return (
    <input  placeholder='search' value={search} onChange={(e) => setSearch(e.target.value)}/>
  )
}

import {  PokemonProvider, usePokemon } from './store';
const PokemonList = () => {
  const { pokemon } = usePokemon();
  return (
    <div>
      {pokemon.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
};

function App() {
  return (
 <PokemonProvider>
    <SearchBox />
  <PokemonList/>
 </PokemonProvider>
  );
}

export default App;
//context and custom hooks are the ways that we redistribute state 
//in a native react state mgmt model
//when using a state mgmt sys, use TS!
//what have we done with the provider? 