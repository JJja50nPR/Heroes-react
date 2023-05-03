import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));


describe('Pruebas en <SearchPage/>', () => { 

    beforeEach( () => jest.clearAllMocks() );

    test('debe de mostrarse coreectamente con valores por defecto', () => { 

        const { container } = render(
           <MemoryRouter>
            <SearchPage/>
           </MemoryRouter>
        );

        expect( container ).toMatchSnapshot();


     });

    test('debe de mostrar a batman y el input con el valor del queryString', () => { 

        render(
           <MemoryRouter initialEntries={['/search?q=batman']}>
            <SearchPage/>
           </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        const img = screen.getByRole('img');

        expect( input.value ).toBe('batman');
        expect( img.src ).toContain('/heroes/dc-batman.jpg');
        
     });

    test('debe de tener el display : none ', () => { 

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
             <SearchPage/>
            </MemoryRouter>
         );

         const div = screen.getByLabelText('searchHeroDiv');


         expect( div.style.display ).toBe('none');


     });

    test('debe de mostrar un error si no se encuentra el hero ( batman123 )', () => {
        
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
             <SearchPage/>
            </MemoryRouter>
         );


         const div = screen.getByLabelText('noHeroDiv');

         expect( div.style.display ).toBe('');

       
     });

    test('debe de llamar el navigate a la pantalla nueva', () => { 

        render(
            <MemoryRouter initialEntries={['/search']}>
             <SearchPage/>
            </MemoryRouter>
         );

        
         const form = screen.getByLabelText('form');
         const input = screen.getByRole('textbox');

         fireEvent.change(input, { target: {name: 'searchText', value: 'superman' }});
         fireEvent.submit(form);

         expect( mockedUseNavigate ).toHaveBeenCalledWith('?q=superman');

     });


 });