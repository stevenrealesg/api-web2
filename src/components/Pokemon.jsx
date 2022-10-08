function Pokemon({image, name, weight}) {
    return ( 
        <div className="card">
            <div className="card-image">
                <img src={image} alt=""  width={150} height={150}/>
            </div>
            <div className="card-info">
                <div className="card-title">{name}</div>
                <div>Peso: {weight} lb</div>
            </div>
        </div>
     );
}

export default Pokemon;