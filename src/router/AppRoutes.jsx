import { createBrowserRouter, Navigate } from "react-router-dom";

import { HeroesApp } from "../HeroesApp";
import { LoginPage } from "../auth";
import { MarvelPage, DcPage, SearchPage, HeroPage } from "../heroes";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";


export const router =  createBrowserRouter([
    {
        path: '/',
        element : <PrivateRoutes> <HeroesApp/> </PrivateRoutes>,
        children: [
            {
                path: '/marvel',
                element: <MarvelPage/>
            },
            {
                path: '/dc',
                element: <DcPage/>
            },
            {
                path: '/search',
                element: <SearchPage/>
            },
            {
                path: '/hero/:id',
                element: <HeroPage/>
            },
 
        ]
            
    },
    {
        path: '/login',
        element: <PublicRoutes> <LoginPage/> </PublicRoutes> 
    },
    {
        path: '/*',
        element :  <HeroesApp/>
    }

]);



