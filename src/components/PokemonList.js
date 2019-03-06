import React from 'react';
import './../css/pokemonList.css';

const PokemonList = props => {
    const { pokemons, areLoading, error, handleClick, capitalize } = props;

    if (areLoading) { return (<div className="section__loader"></div>); }

    if (error) { return (<React.Fragment>{error}</React.Fragment>); }

    if (pokemons) {
        return (
            <ul className="list">
                {pokemons.map(pokemon =>
                    <li className="list__item" key={pokemon.name} onClick={() => handleClick(pokemon.url)}>
                        {capitalize(pokemon.name)}
                    </li>
                )}
            </ul>
        );
    } else {
        return null;
    }
}

export default PokemonList;