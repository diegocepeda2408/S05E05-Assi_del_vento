import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Fragment, useEffect, useState } from "react";

function PokemonCard({ url }) {
    const [pokemon, setPokemon] = useFetch();
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (url) getPokemon();
    }, [url]);

    const getPokemon = () => {
        setPokemon(url);
    };

    const types = pokemon?.types.map(type => type.type.name);
    const backgroundType = types ? `type--${types[0]}` : "";

    if (!types) return null;

    return (
        <Link to={`/pokedex/${pokemon?.name}`} className="pokemon-card__link">
            <div
                className={`pokemon-card ${backgroundType}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="pokemon-card__image-container">
                    <img
                        src={pokemon?.sprites?.other['official-artwork'].front_default}
                        alt={pokemon?.name}
                        className="pokemon-card__image"
                    />
                </div>
                <div className="pokemon-card__info">
                    <h2 className="pokemon-card__name">{pokemon?.name}</h2>
                    <div className="pokemon-card__types">
                        {types.map((type, index) => {
                            return (
                                <Fragment key={type}>
                                    <span className={`pokemon-card__type pokemon-card__type--${type}`}>
                                        {index > 0 && ""}
                                        {type}
                                    </span>
                                </Fragment>
                            );
                        })}
                    </div>
                    <p className="pokemon-card__type-label">Type</p>
                </div>

                <div
                    className={`pokemon-card__stats ${isHovered ? "pokemon-card__stats--visible" : ""}`}
                >
                    <div className="pokemon-card__stat">
                        <span className="pokemon-card__stat-label">HP</span>
                        <span className="pokemon-card__stat-value">{pokemon?.stats[0].base_stat}</span>
                    </div>

                    <div className="pokemon-card__stat">
                        <span className="pokemon-card__stat-label">Attack</span>
                        <span className="pokemon-card__stat-value">{pokemon?.stats[1].base_stat}</span>
                    </div>

                    <div className="pokemon-card__stat">
                        <span className="pokemon-card__stat-label">Defense</span>
                        <span className="pokemon-card__stat-value">{pokemon?.stats[2].base_stat}</span>
                    </div>

                    <div className="pokemon-card__stat">
                        <span className="pokemon-card__stat-label">Speed</span>
                        <span className="pokemon-card__stat-value">{pokemon?.stats[5].base_stat}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
};

export default PokemonCard;