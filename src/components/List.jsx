import Pokemon from "./Pokemon";

function List() {
    return ( 
        <div className="list-cards">
            <h2>Lista de pokemones</h2>
            <Pokemon />
            <Pokemon />
            <Pokemon />
        </div>
     );
}

export default List;