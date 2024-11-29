import { Link } from "react-router-dom";
import Search from "../components/pokedex/Search";
import Filters from "../components/pokedex/Filters";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import PokemonList from "../components/pokedex/PokemonList";
import PokemonCard from "../components/pokedex/PokemonCard";
import { useNameContext } from "../contexts/nameContext";

function Pokedex(){

   const [pokemons, setPokemons] = useFetch();
   const [pokemonUrl, setPokemonUrl] = useState(null);
   const [isFiltering, setIsFiltering] = useState(false);
   const [page, setPage] = useState(1);
   const [name] = useNameContext();

   useEffect(() => {
      getPokemons()
   },[])

   const getPokemons = () => {
      setPokemons('https://pokeapi.co/api/v2/pokemon')
   }

   const handleSearch = (value) => {
      if(!value){
         setIsFiltering(false)
         setPokemonUrl(null)
      setPokemons(`https://pokeapi.co/api/v2/pokemon`)
      }else{
         value = value.toLowerCase().trim()
         setPokemonUrl(`https://pokeapi.co/api/v2/pokemon/${value}`)
      }
   }

   const handleTypeFilter = (type) => {
      if (!type){
         setIsFiltering(false)
         setPokemons(`https://pokeapi.co/api/v2/pokemon`)
      }else{
         setIsFiltering(true)
         setPokemons(`https://pokeapi.co/api/v2/type/${type}`)
      }
   }

   const onNext = () => {
      setPokemons(pokemons?.next)
   }

   const onPrev = () => {
      setPokemons(pokemons?.previous)
   }

   let pokemonsArray = isFiltering ? pokemons?.pokemon : pokemons?.results

   const newArray = pokemonsArray ? pokemonsArray.length : 0
   
   const newPage = newArray/20 > 1 ? Math.ceil(newArray/20) : 1

   if (newArray > 20){
      const lower =  20 * page - 20
      const higher = 20 * page
      pokemonsArray = pokemonsArray.slice(lower,higher)
   }

   const prevPage = () => {
      if(page > 1){
         setPage(page - 1)
      }
   }

   const nextPage = () => {
      if(page < newPage){
         setPage(page + 1)
      }
   }



   return(
      <div className="pokedex">
         <header className="pokedex__header">
            <Link to="/" className="pokedex__return">
               {"←"} Return
            </Link>
            <h2 className="pokedex__title">Welcome Trainer {name}</h2>
            <p className="pokedex__subtitle">You can find your favorite Pokémon here</p>
         </header>

         <div className="pokedex__form">
            <Search handleSearch={handleSearch}/>
            <Filters handleTypeFilter={handleTypeFilter} />
         </div>

         <div className="pokedex__pagination">
            <button onClick={onPrev} disabled={!pokemons?.previous} className="pokedex__pagination-btn">
               Previous
            </button>
            <p><b>Number of cards:</b> {newArray} </p>
            <button onClick={onNext} disabled={!pokemons?.next} className="pokedex__pagination-btn">
               Next
            </button>
         </div>

         <div className="message">
         {pokemonUrl ? (
                  <div className="pokemon-card-header">
                     <h3 className="pokemon-card-title">To get back to the main menu, press the search button again!</h3>
                  </div>
               ) : (
                  <>
                  </>
               )}
         </div>

         <div className="pokedex__list">

            {pokemonUrl ? (
               <PokemonCard url={pokemonUrl} />
            ) : (<>
               <PokemonList pokemons={pokemonsArray} isFiltering={isFiltering} />
               {newPage > 1 ? (
                  <div className="pokedex__pagination-bottom">
                     <button onClick={prevPage} disabled={page === 1}>Previous</button>
                     <p>{`Page ${page}/${newPage}`}</p>
                     <button onClick={nextPage} disabled={page === newPage}>Next </button>
                  </div>
                  ) : (
                  <div className="pokedex__pagination-bottom">
                     <p>{"Page 1/1"}</p>
                  </div>
               )}
               </>
            )}
         </div>
      </div>
   ) 
};

export {Pokedex};