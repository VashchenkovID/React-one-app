import React, {useContext} from 'react';

import {privateRoutes, publicRoutes} from "../router";
import {AuthContext} from "../context";

import Loader from "./UI/Loader/Loader";
import { Navigate, Route, Routes } from 'react-router-dom';


const AppRouter = () => {
   
    return (
        
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        component={route.component}
                        path="/posts"
                        element={<Navigate replace to="/posts" />}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
               
            </Routes>
            
       
    );
};

export default AppRouter;
