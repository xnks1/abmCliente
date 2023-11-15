import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import SobreNosotros from "../pages/SobreNosotros/SobreNosotros"
import IniciarSesion  from "../pages/IniciarSesion/IniciarSesion"
import Administration from "../pages/ArticuloInsumo/Administration.tsx"
import Cliente from "../pages/Cliente/Cliente.tsx"

import React from "react"

import Factura from "../pages/Factura/Factura.tsx"
import RubroArticuloInsumo from "../pages/RubroArticuloInsumo/RubroArticuloInsumo.tsx"
import Domicilio from "../pages/Domicilio/Domicilio.tsx"

const Login = React.lazy(() => import('../pages/Login/Login'));
const PrivateRoute = React.lazy(() => import('./PrivateRoute'));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}> </Route>
        <Route path='/sobrenosotros' element={<SobreNosotros/>}> </Route>
        <Route path='/iniciarsesion' element={<IniciarSesion/>}> </Route>
        <Route element={<PrivateRoute element={<Administration />} />} path="/administration" />
        <Route element={<PrivateRoute element={<Factura />} />} path="/Factura" />
        
        <Route element={<PrivateRoute element={<RubroArticuloInsumo />} />} path="/rubroArticuloInsumo" />
        <Route element={<PrivateRoute element={<Cliente />} />} path="/Cliente" />
        <Route element={<PrivateRoute element={<Domicilio />} />} path="/domicilios" />
        <Route element={<Login />} path="/login" />     
        <Route path="/administration" element={<Administration/>}/> 
        <Route path="/factura" element={<Factura/>}/> 
        <Route path="/rubroArticuloInsumo" element={<RubroArticuloInsumo/>}/> 
        <Route path="/cliente" element={<Cliente/>}/> 



    </Routes>
  )
}

export default AppRoutes