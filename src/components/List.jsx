import { useEffect, useState } from "react";
import Pokemon from "./Pokemon";

function List() {

    const [pokemons, setPokemons] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=2")
                const data = await res.json()
                const promises = data.results.map(async item => {
                    const resPokemon = await fetch(item.url)
                    const dataPokemon = await resPokemon.json()
                    return {
                        id: dataPokemon.id,
                        name: dataPokemon.name,
                        weight: dataPokemon.weight,
                        image: dataPokemon.sprites.other.dream_world.front_default
                    }
                })
                setPokemons(await Promise.all(promises))
            } catch (error) {
                console.error("Error al obtener la información.", error)
            }
        }
        fetchData()
    }, [])

    return (
        <div className="list-cards">
            <h2>Lista de pokemones</h2>
            {pokemons.map(pokemon => (
                <Pokemon key={pokemon.id} {...pokemon} />
            ))}
        </div>
     );
}

export default List;