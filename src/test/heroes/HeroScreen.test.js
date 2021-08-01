import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import { HeroScreen } from "../../components/heroes/HeroScreen";

describe('Pruebas en <HeroScreen />', () => {

    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    };

    const wrapper = mount( 
        <MemoryRouter initialEntries={['/hero']} >
            <HeroScreen history={ history }/> 
        </MemoryRouter>
    );

    test('debe de mostrar el componente Redirect si no hay argumentos en el URL', () => {
        
        expect( wrapper.find('Redirect').exists() ).toBe( true );
        // expect( wrapper ).toMatchSnapshot();

    });

    test('debe de mostrar un hero si el parametro existe y se encuentra', () => {

        const wrapper = mount( 
            <MemoryRouter initialEntries={['/hero/dc-robin']} >
                <Route path="/hero/:heroeId" component={ HeroScreen } /> 
            </MemoryRouter>
        );

        expect( wrapper.find('.row').exists() ).toBe( true );

    });

    test('debe de regresar a la pantalla anterior con PUSH', () => {

        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        };

        const wrapper = mount( 
            <MemoryRouter initialEntries={['/hero/dc-robin']} >
                <Route 
                    path="/hero/:heroeId" 
                    component={ (props) => <HeroScreen history={ history } /> } 
                /> 
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( history.push ).toHaveBeenCalledWith('/');
        expect( history.goBack ).not.toHaveBeenCalled();

        
    });

    test('debe de regresar a la pantalla anterior', () => {

        const wrapper = mount( 
            <MemoryRouter initialEntries={['/hero/dc-robin']} >
                <Route 
                    path="/hero/:heroeId" 
                    component={ (props) => <HeroScreen history={ history } /> } 
                /> 
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( history.push ).not.toHaveBeenCalled();
        expect( history.goBack ).toHaveBeenCalled();
        
    });

    test('debe de llamar el Redirect si el hero no existe', () => {

        const wrapper = mount( 
            <MemoryRouter initialEntries={['/hero/dc-robinasdadssadasd']} >
                <Route 
                    path="/hero/:heroeId" 
                    component={ (props) => <HeroScreen history={ history } /> } 
                /> 
            </MemoryRouter>
        );

        expect( wrapper.text() ).toBe('');
        
    });
    
});
