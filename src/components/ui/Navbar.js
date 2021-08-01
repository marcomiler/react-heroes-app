import React, { useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const Navbar = () => {

    //TENER EN CUENTA !!!!!
    //El navbar al no ser una ruta no tiene acceso al history
    //una primera opcion fue obtener la history por los props y enviarselo al navbar

    const { user: { name } } = useContext( AuthContext );//obtengo la propiedad name de mi objeto
    const history = useHistory();//el router tambien es un provider por lo que tiene informacion de todo el contexto de las rutas, entre ellas el history
    // console.log(history);

    const { dispatch } = useContext( AuthContext );

    const handleLogout = () => {

        dispatch({
            type: types.logout
        });

        history.replace('/login');
        
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Asociaciones
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/dc"
                    >
                        DC
                    </NavLink>

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/search"
                    >
                        Search
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">

                    <span className="nav-item nav-link text-info">
                    | { name } |
                    </span>

                    <button
                        onClick={handleLogout}
                        className="btn nav-item nav-link" 
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}