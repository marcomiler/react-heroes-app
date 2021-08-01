import { mount } from "enzyme";
import { MemoryRouter, Router } from "react-router-dom";

import { types } from "../../../types/types";
import { Navbar } from "../../../components/ui/Navbar";
import { AuthContext } from "../../../auth/AuthContext";

describe('Pruebas en <Navbar />', () => {

    //simulamos todas las funciones del history, ya q nos marca error al hacer el test si no los incluimos
    const historyMock = { //simulamos el history
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn()
    };
 
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Pedro'
        }
    };
    
    const wrapper = mount(
        <MemoryRouter>
            <AuthContext.Provider value={ contextValue } >
                <Router history={ historyMock } >
                    <Navbar />
                </Router>
            </AuthContext.Provider>
        </MemoryRouter>
    );

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('debe de mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe('| Pedro |')

    });

    test('debe de llamar el logout y usar history', () => {
       
       wrapper.find('button').prop('onClick')();//simulamos el click

       expect( contextValue.dispatch ).toHaveBeenCalledWith({
           type: types.logout
       });

       expect( historyMock.replace ).toHaveBeenCalledWith( '/login' );

    });



});
