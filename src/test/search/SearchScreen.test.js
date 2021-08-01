import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import SearchScreen from "../../components/search/SearchScreen";

describe('Pruebas en <SearchScreen />', () => {

    const wrapper = mount( 
        <MemoryRouter initialEntries={['/search']}>
            <Route path="/search" component={ SearchScreen } />
        </MemoryRouter>
    );

    test('debe de mostrarse correctamente con valores por defecto', () => {

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.alert-info').text().trim() ).toBe('Search a hero');
        
    });

    test('debe de mostrar a Batman y al input con el valor del queryString', () => {

        const wrapper = mount( 
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        );

        expect( wrapper.find('input').prop('value') ).toBe('batman');
        expect( wrapper ).toMatchSnapshot();
        
    });

    test('debe de mostrar un error si no se encuentra el Hero', () => {
        
        const query = 'batmanxdxdxd'

        const wrapper = mount( 
            <MemoryRouter initialEntries={[`/search?q=${query}`]}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>//
        );

        expect( wrapper.find('.alert-danger').text().trim() ).toBe(`There is not a hero with ${query}`);
        expect( wrapper ).toMatchSnapshot();

    });

    test('debe de llamar el PUSH del history', () => {
       
        const history = {
            push: jest.fn()
        };

        const wrapper = mount( 
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <Route 
                    path="/search" 
                    component={ () => <SearchScreen history={ history } /> } 
                />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'txtSearch',
                value: 'batman'
            }
        });

        wrapper.find('form').prop('onSubmit')({ preventDefault(){} });

        expect( history.push ).toHaveBeenCalledWith(`?q=batman`);

    });    
    
});

