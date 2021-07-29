import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { getHeroeById } from '../../selectors/getHeroById';

export const HeroScreen = ({history}) => {

    //extraemos el Id de los parametros
    const {heroeId} =  useParams();
    const hero = useMemo(() => getHeroeById(heroeId), [heroeId] );

    if(!hero){
        return <Redirect to="/"/>//si la ruta no existe q me redirija al /
    }

    const handleReturn = () => {
        //si copias la ruta actual y la copiamos en otro navegador y retrocedemos nos sacaría 
        //del navegador, asi que debemos validar eso con el length, valor historial
        if(history.length <=2){
            history.push('/');
        }else{
            history.goBack();
        }
    }

    const {
        id,
        superhero,
        alter_ego,
        publisher,
        first_appearance,
        characters
    } = hero;

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img src={`../assets/heroes/${heroeId}.jpg`} 
                     alt={id}
                     className="img-thumbnail"/>
            </div>

            <div className="col-8">
                <h3>{superhero}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Alter ego: </b> {alter_ego}</li>
                    <li className="list-group-item"><b>Publisher: </b> {publisher}</li>
                    <li className="list-group-item"><b>First appearance: </b> {first_appearance}</li>
                </ul>

                <br />

                <h5>Characters</h5>
                <p>{characters}</p>

                <button className="btn btn-outline-info"
                    onClick={handleReturn}
                >
                    Return
                </button>
            </div>
        </div>
    )
}
