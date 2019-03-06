import React from 'react';
import './../css/pokemonDetail.css';

const PokemonDetail = props => {
    const { pokemon, isLoading, errorSelected, capitalize } = props;

    if (isLoading) { return (<div className="section__loader"></div>); }
    
    if (errorSelected) { return (<React.Fragment>{errorSelected}</React.Fragment>); }

    if (pokemon) {
        return (
            <div className="detail">
                <p className="detail__name">{capitalize(pokemon.name)}</p>
                <img className="detail__img" src={pokemon.image} alt={pokemon.name} />
            </div>
        );
    } else {
        return null;
    }
}
        
export default PokemonDetail;