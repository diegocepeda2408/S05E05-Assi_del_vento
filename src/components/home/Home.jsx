import { useRef } from "react";
import { types, useNameContext } from "../../contexts/nameContext";
import { Link, useNavigate } from "react-router-dom";
import {b1} from "../../assets/img/images";

function Home(){
    const inputRef = useRef()
    const [name, dispatch] = useNameContext()
    const navigate = useNavigate();

    const setName = () => {
        dispatch({
            type: types.SET_NAME,
            payload: inputRef.current.value.trim()
        })
        
        inputRef.current.value = ''
        navigate('/pokedex')
    }

    const clearName = () => {
        dispatch({
            type: types.SET_NAME,
        })
    }

    return (
        <div className="home">
            <img src={b1} alt="pokedex" className="home__logo" />
            <h1 className="home__title">
            Welcome {name ? <>back {name}</> : "Trainer"}!
            </h1>
    
            <div className="home__content">
                {name ? (
                    <>
                        <p className="home__text">Let's keep going your Pokemon trip</p>
                        <p className="home__link">
                            Go to your <Link to="/pokedex">Pokedex</Link>
                        </p>
                        <button onClick={clearName} className="home__logout-btn">
                            LOG OUT
                        </button>
                    </>
                ) : (
                    <>
                        <p className="home__text">To start, enter your name</p>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Your name ..."
                            className="home__input"
                        />
                        <button onClick={setName} className="home__start-btn">
                            START
                        </button>
                    </>
                )}
            </div>
        </div>
    )
};

export {Home};