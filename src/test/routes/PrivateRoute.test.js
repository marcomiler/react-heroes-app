import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { PrivateRoute } from "../../routers/PrivateRoute";

//las pruebas para el PublicRoute seran similares

describe('Pruebas en <PrivateRoute />', () => {

    const props = {
        location: {
            pathname: '/marvel'
        }
    };

    Storage.prototype.setItem = jest.fn();//para poder evaluar el localstorage

    test('debe de mostrar el componente si está autenticado y guardar localStorage', () => {
        
        //importante trabajar con el MemoryRouter cuando evaluamos rutas
        //trabajamos con mount y no shallow ya que tenemos
        const wrapper = mount( 
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated={ true }
                    component={ () => <span>listo!</span> }//ya que los componentes son una funcion lo mandamos como tal para evitar errores
                    { ...props }
                />  
            </MemoryRouter>
        );
        
        expect( wrapper.find('span').exists() ).toBe( true );
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'lastpath', '/marvel' );

    });

    test('debe de bloquear el componente si no está autenticado', () => {

        const wrapper = mount( 
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated={ false }
                    component={ () => <span>listo!</span> }//ya que los componentes son una funcion lo mandamos como tal para evitar errores
                    { ...props }
                />  
            </MemoryRouter>

        );

        expect( wrapper.find('span').exists() ).toBe( false );
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'lastpath', '/marvel' );
        
    });
    
});