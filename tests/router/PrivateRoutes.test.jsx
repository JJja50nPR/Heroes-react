import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PrivateRoutes } from "../../src/router/PrivateRoutes";

describe('Pruebas en <PrivateRoutes/>', () => {  

    test('debe de mostrar el children si esta autenticado', () => { 

        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            ser: {
                id : 'ABC',
                name : 'Jason'
            }
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contextValue }>
                    <PrivateRoutes>
                        <h1>Ruta privada</h1>
                    </PrivateRoutes>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( screen.getByText('Ruta privada') ).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel');

    });


});