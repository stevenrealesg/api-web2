import { useEffect, useState } from "react";
import Pokemon from "./Pokemon";

function List() {

    const [pokemons, setPokemons] = useState([])
    const [loading, setLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [totalRecords, setTotalRecords] = useState(0)
    const limit = 15

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
                const data = await res.json()
                setTotalRecords(data.count)
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
                setLoading(false)
            } catch (error) {
                console.error("Error al obtener la información.", error)
                setLoading(false)
            }
        }
        setLoading(true)
        fetchData()
    }, [offset])

    return (
        <>
            <div className="list-cards">
                <h2>Lista de pokemones</h2>
                <div className="paginator">
                    <button 
                        className="p-back" 
                        onClick={() => setOffset(prev => prev - limit)}
                        disabled={offset === 0}
                    >
                        {'< Anterior'}
                    </button>
                    <button 
                        className="p-next"
                        onClick={() => setOffset(prev => prev + limit)}
                        disabled={(offset + limit) >= totalRecords}
                    >
                        {'Siguiente >'}
                    </button>
                </div>
                <div className="cards-container">
                    {pokemons.map(pokemon => (
                        <Pokemon key={pokemon.id} {...pokemon} />
                    ))}
                </div>
                <div className="footer">Created by Steven Reales Gonzalez</div>
            </div>
            {loading &&
                <div className="backdrop">
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>}
        </>
    );
}

export default List;