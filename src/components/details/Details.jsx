import { Link, useParams } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch";
import { useEffect } from "react";

const typeGradients = {
    fire: "linear-gradient(180deg, rgba(255, 204, 187, 0.7), rgba(241, 76, 0, 0.8))",
    water: "linear-gradient(180deg, rgba(173, 216, 255, 0.7), rgba(30, 144, 255, 0.8))",
    grass: "linear-gradient(180deg, rgba(185, 232, 188, 0.7), rgba(76, 175, 80, 0.8))",
    electric: "linear-gradient(180deg, rgba(255, 249, 196, 0.7), rgba(255, 223, 0, 0.8))",
    psychic: "linear-gradient(180deg, rgba(232, 180, 237, 0.7), rgba(156, 39, 176, 0.8))",
    ice: "linear-gradient(180deg, rgba(179, 232, 240, 0.7), rgba(0, 188, 212, 0.8))",
    dragon: "linear-gradient(180deg, rgba(168, 213, 248, 0.7), rgba(33, 150, 243, 0.8))",
    dark: "linear-gradient(180deg, rgba(89, 89, 89, 0.7), rgba(33, 33, 33, 0.8))",
    fairy: "linear-gradient(180deg, rgba(248, 196, 216, 0.7), rgba(240, 98, 146, 0.8))",
    normal: "linear-gradient(180deg, rgba(236, 236, 236, 0.7), rgba(158, 158, 158, 0.8))",
    fighting: "linear-gradient(180deg, rgba(241, 153, 153, 0.7), rgba(211, 47, 47, 0.8))",
    flying: "linear-gradient(180deg, rgba(196, 228, 249, 0.7), rgba(3, 169, 244, 0.8))",
    poison: "linear-gradient(180deg, rgba(227, 196, 241, 0.7), rgba(156, 39, 176, 0.8))",
    ground: "linear-gradient(180deg, rgba(216, 196, 184, 0.7), rgba(121, 85, 72, 0.8))",
    rock: "linear-gradient(180deg, rgba(211, 196, 184, 0.7), rgba(121, 85, 72, 0.8))",
    bug: "linear-gradient(180deg, rgba(213, 234, 199, 0.7), rgba(139, 195, 74, 0.8))",
    ghost: "linear-gradient(180deg, rgba(203, 191, 231, 0.7), rgba(103, 58, 183, 0.8))",
    steel: "linear-gradient(180deg, rgba(196, 211, 220, 0.7), rgba(96, 125, 139, 0.8))"
};

function Details() {
    const params = useParams();
    const [pokemon, setPokemon] = useFetch();

    useEffect(() => {
        if (params.name) getPokemon();
    }, [params.name]);

    const getPokemon = () => {
        setPokemon(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
    };

    const types = pokemon?.types.map(type => type.type.name);

    const primaryColor = types?.[0] ? typeGradients[types[0]] : "linear-gradient(180deg, #f5f5f5, #f5f5f5)";
    const secondaryColor = types?.[1] ? typeGradients[types[1]] : primaryColor;

    return (
        <div
            className="details"
            style={{
                background: primaryColor,
            }}
        >
            <Link to="/pokedex" className="details__return">{'←'} Return</Link>

            <div className="details__image-container">
                <div>
                    <img
                        src={pokemon?.sprites?.other['official-artwork'].front_default}
                        alt={pokemon?.name}
                        className="details__image"
                    />
                </div>
            </div>

            <div className="details__info">
                <span className="details__id">
                    #{pokemon?.id?.toString().padStart(3, '0')}
                </span>
                <h2 className="details__name">{pokemon?.name}</h2>

                <div className="details__stats">
                    <div className="details__stat-group">
                        <span className="details__stat-label">Weight:</span>
                        <span className="details__stat-value">{pokemon?.weight / 10} Kg</span>
                    </div>

                    <div className="details__stat-group">
                        <span className="details__stat-label">Height:</span>
                        <span className="details__stat-value">{pokemon?.height * 10} cm</span>
                    </div>
                </div>

                <div className="details__attributes">
                    <div className="details__attribute-group">
                        <h3 className="details__attribute-title">Type</h3>
                        <div className="details__attribute-list">
                            {types?.map((type) => (
                                <span key={type} className="details__attribute-item">{type}</span>
                            ))}
                        </div>
                    </div>

                    <div className="details__attribute-group">
                        <h3 className="details__attribute-title">Abilities</h3>
                        <div className="details__attribute-list">
                            {pokemon?.abilities?.map((data) => (
                                <span key={data?.ability?.name} className="details__attribute-item">
                                    {data?.ability?.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export {Details}