import React, { Component } from 'react';
import Header from './Header';
import PokemonList from './PokemonList';
import PokemonDetail from './PokemonDetail';
import './../css/pokemons.css';

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const LIMIT_QUERY = "?limit=";

class Pokemons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 9,
            pokemons: [],
            areLoading: false,
            error: null,

            selected: null,
            isLoading: false,
            errorSelected: null
        };
    }

    componentDidMount = () => {
        this.setState({ areLoading: true });

        fetch(`${BASE_URL}${LIMIT_QUERY}${this.state.amount}`)
            .then(response => {
                if (response.ok) { return response.json(); }
                else { throw new Error('Something went wrong...'); }
            }).then(data => {
                this.setState({ pokemons: data.results, areLoading: false });
            }).catch(error => this.setState({ error, areLoading: false }));
    }

    showPokemon = url => {
        if (!this.state.selected || this.state.selected.url !== url) {
            this.setState({ isLoading: true });

            fetch(url)
                .then(response => {
                    if (response.ok) { return response.json(); }
                    else { throw new Error('Something went wrong...'); }
                }).then(data => {
                    let pokemon = {};
                    pokemon.url = url;
                    pokemon.name = data.name;
                    pokemon.image = data.sprites.front_default;
                    this.setState({ selected: pokemon, isLoading: false });
                }).catch(error => this.setState({ errorSelected: error, isLoading: false }));
        } else {
            return;
        }
    }

    capitalize = str => {
        return str.slice(0, 1).toUpperCase() + str.slice(1);
    }

    render() {
        const { pokemons, areLoading, error, selected, isLoading, errorSelected } = this.state;

        return (
            <div className="container">
                <div className="section section--header">
                    <Header />
                </div>
                <div className="section section--list">
                    <PokemonList pokemons={pokemons}
                        areLoading={areLoading}
                        error={error}
                        handleClick={this.showPokemon}
                        capitalize={this.capitalize}
                    />
                </div>
                <div className="section section--detail">
                    <PokemonDetail pokemon={selected}
                        isLoading={isLoading}
                        errorSelected={errorSelected}
                        capitalize={this.capitalize}
                    />
                </div>
            </div>
        );
    }
}

export default Pokemons;
