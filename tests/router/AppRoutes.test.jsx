import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext, LoginPage } from "../../src/auth";
import { MarvelPage } from "../../src/heroes/pages/MarvelPage";


jest.mock('../../node_modules/query-string', () => '');

describe('Pruebas en <AppRoutes/>', () => { 

    test('debe de mostrar el login si no esta autenticado', () => { 


        const contextValue = {
            logged: false,
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={{contextValue}}>
                    <LoginPage/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( screen.getAllByText('Login').length ).toBe(2);

     });

     test('debe de mostrar el componente de Marvel si esta auteticado', () => { 

        const contextValue = {
            logged: true,
            user : {
                id : 'ABC',
                name: 'Jason'
            }
        }

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={{contextValue}}>
                    <MarvelPage/>
                </AuthContext.Provider>
            </MemoryRouter>
        );



        expect( screen.getByText('Marvel Comics') ).toBeTruthy();



      });

 });