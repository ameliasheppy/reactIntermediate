import { useReducer, useEffect, createContext, useContext, useCallback, useMemo } from "react";
//you should ALWAYS useCallbacks in custom hooks in a func that you are returning
//put an empty dep arr with it bc there are no deps . just a dispatch happening.
//the dispatch is a constant

//lets build a custom hook to go get the Poke data. 
//we know we will need state to do this
//we are going to use useEffecto to do our Poke data fetch
//just setting setPokemon[data] is a prob, gives us a never arr
//ts cant define what this will look like, so it panics
//lets use aninterface to tell ts what a Pokemon is
//with useContext we can move data all around without any prop drillling

interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

//below we can tell ts that it needs to make an array of Poke using the generic syntax
//here we are defining Pokemon with the context
function usePokemonSource(): {
  pokemon: Pokemon[];
  search: string;
  setSearch: (search: string) => void
} {
//   const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  //ts demands that we give typing to our useReducer
  type PokemonState ={
    //an arr of pokemon and search is a str
    pokemon:Pokemon[],
    search: string
  }
  type PokemonAction= | {type: "setPokemon"; payload: Pokemon[]} | {type:"setSearch"; payload:string}
  const [{pokemon, search}, dispatch]=useReducer((state:PokemonState, action:PokemonAction) =>{
    switch(action.type){
        case "setPokemon":
            return{...state, pokemon:action.payload};
            case "setSearch":
                return {...state, search: action.payload}
    }
  },{
    pokemon:[],
    search:"foo, because, why not? an empty str is boring",
  })

  useEffect(() => {
    fetch("/pokemon.json")
      .then((response) => response.json())
      .then((data) => dispatch({
        type:"setPokemon",
        payload: data,
      }));
  }, []);

  const setSearch = useCallback((search: string) =>{
    dispatch({
        type:"setSearch",
        payload: search
    })
  }, [])
  //we want to return an array of the filtered pokemon that a user has searched for. 
  //since it will calculate a lot, useMemo!
  const filteredPoke = useMemo(
    () =>  pokemon.filter((p) => p.name.includes(search.toLowerCase()))
  ,[pokemon, search])
  //check out the reative nature of React, it's amazing! we are creating a connection between pokemon, our filter func,and the App comp
  //we are able to useMemo to update the pokemon filter as a user types, absolutely wild!

  //lets make a sorted version of our pokeFilter
  //what does our sort depend on? 
    const sortedPokeFilterResults = useMemo(() => 
        [...filteredPoke].sort((a,b) => a.name.localeCompare(b.name)),
        [filteredPoke]
    )

  return { pokemon:sortedPokeFilterResults,search, setSearch };
}
//the return type is the return type of the usePokemon source
//we know that our API will return the pokemon info, so we can use as

const PokemonContext = createContext<ReturnType<typeof usePokemonSource>>(
  {} as unknown as ReturnType<typeof usePokemonSource>
);
//usePokemon is the output of the context

//be careful to avoid prop drilling
//prop drilling is getting data and sending it down as props like
//const PokemonList = ({pokemon}:{pokemon: Pokemon[]})
//if the list was deep in the heirarchy of our app, we would have troubles
//lets create context to avoid prop drilling
// const PokemonList = () => {
//   const { pokemon } = usePokemon();
//   return (
//     <div>
//       {pokemon.map((p) => (
//         <div key={p.id}>{p.name}</div>
//       ))}
//     </div>
//   );
// };
// when you use useContext, you automatically get back a .provider
//that's a React element you can use to provide value down by
//specifying the prop for the val
//the val here in our context is the val of usePokemon
export function usePokemon(){
    return useContext(PokemonContext)
}

export function PokemonProvider({children}: {children: React.ReactNode}){
    return (
    <PokemonContext.Provider value={usePokemonSource()}>
   {children}
  </PokemonContext.Provider>
    )
}