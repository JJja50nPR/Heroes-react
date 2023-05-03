import { authReducer } from "../../../src/auth/context";
import { types } from "../../../src/auth/types/types";

describe('Pruebas en authReducer', () => { 


    test('debe de retornar el estado por defecto', () => { 

        const state = authReducer( { logged : false }, {});

        expect( state ).toEqual({ logged : false }) ;


     });


     test('debe de llamar el login autenticar y establecer el user', () => {

        const actionLogIn = {
            type: types.login,
            payload : {
                id : 'ABC',
                name: 'Jason',
            }
        }
    

        const state = authReducer( { logged : false } , actionLogIn  );

        expect( state ).toEqual({
            logged: true,
            user : actionLogIn.payload
        });


     });

     test('debe de borrar el name del usuario y logged en false', () => { 

        const state = {
            logged : true,
            user : { id : 'ABC', name: 'Jason' },
            type: types.logout,
        }

        const action = {
            type: types.logout,
        }


        const newState = authReducer( state , action  );

        expect( newState ).toEqual({ logged : false });


     });

 });