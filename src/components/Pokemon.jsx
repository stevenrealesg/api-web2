function Pokemon({image, name, weight}) {
    return ( 
        <div className="card">
            <div className="card-image">
                <img src={image} alt="" />
            </div>
            <div className="card-info">
                <div className="card-title">{name}</div>
                <p>Peso: {weight} lb</p>
            </div>
        </div>
     );
}

export default Pokemon;