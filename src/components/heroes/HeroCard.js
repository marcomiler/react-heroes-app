import React from 'react';
import { Link } from 'react-router-dom';

const HeroCard = ({
    id,
    superhero,
    alter_ego,
    first_appearance,
    characters
}) => {
    return (

         <div className="card m-1" style={{maxWidth:500}}>

            <div className="row">

                <div className="col-md-4" >
                    <img src={`assets/heroes/${id}.jpg`} className="img-fluid rounded-start" alt={id} />
                </div>

                <div className="col-md-8">
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
