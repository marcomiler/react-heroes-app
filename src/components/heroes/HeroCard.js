import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/Hero.css';
import { heroImages } from '../../helpers/heroImages';

const HeroCard = ({
    id,
    superhero,
    alter_ego,
    first_appearance,
    characters
}) => {
    return (

         <div className="card">

            <div className="row">

                <div className="" >
                    <img 
                        // src={`assets/heroes/${id}.jpg`} 
                        src={ heroImages(`./${ id }.jpg`).default }
                        className="img-fluid" 
                        alt={id}
                    />
                </div>

                <div className="">
                    <div className="card-body">
                        <h5 className="card-title">{superhero}</h5>
                        <p className="card-text">{alter_ego}</p>

                        {
                            (alter_ego !== characters)
                            && <p className="card-text"><small className="text-muted">{characters}</small></p>
                        }

                        <p className="card-text"><small className="text-muted">{first_appearance}</small></p>
                        
                        <Link to={`/hero/${id}`} >Mas...</Link>

                    </div>
                </div>

            </div>

        </div> 
    );
}

export default HeroCard;
