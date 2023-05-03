import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PublicRoutes } from "../../src/router/PublicRoutes";

describe('Pruebas en <PublicRoutes/>', () => { 

    test('debe de mostrar el children si no esta autenticado', () => { 

        const contextValue = {
            logged: false,
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <PublicRoutes>
                    <h1>Ruta Pública</h1>
                </PublicRoutes>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Ruta Pública') ).toBeTruthy();


    });

    test('debe de navegar si esta autenticado', () => {

        const contextValue = {
            logged: true,
            user : {
                name: 'Strider',
                id: 'ABC123'
            }
        }

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={ contextValue }>
                    
                        <Routes>
                            <Route element={<PublicRoutes/>}>
                                <Route path="/login" element={<h1>Public route</h1>}/>
                            </Route>
                            <Route path="/marvel" element={<h1>Marvel Page</h1>}/>
                        </Routes>
                    
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( screen.getByText('Marvel Page') ).toBeTruthy();

    });


 });