import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher'
import HeroCard from './HeroCard';
import '../../css/Hero.css';

const HeroList = ({publisher}) => {

    const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

    return (
        <div className="lst-heroes">
            {
                heroes.map(heroe => (
                    <HeroCard key={heroe.id} {...heroe}/>
                ))

                
            }
        </div>
        
    )
}

export default HeroList
