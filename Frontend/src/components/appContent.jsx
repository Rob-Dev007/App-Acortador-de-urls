import { Routes, Route } from "react-router-dom";
import Home from '../paginas/home'
import Configuracion from '../paginas/configuracion'
import Login from "../paginas/Login";
import Registrate from "../paginas/Registrate";
import ConfirmarCuenta from "../paginas/ConfirmarCuenta";
import OlvidePassword from "../paginas/OlvidePassword";
import NuevoPassword from "../paginas/NuevoPassword";
import Dashboard from "../paginas/Dashboard";
import HeaderAndFooter from "../layout/HeaderAndFooter";
import RutaProtegida from "../layout/RutasProtegidas";
import UseTheme from "../hooks/UseTheme";


const AppContent = ()=>{

  const { theme } = UseTheme();

    return(
        <div className = {`${theme === 'dark' ? 'darkTheme' : 'lightTheme'} w-full`}>
          <Routes>
            <Route path="/" element={ <HeaderAndFooter />}>
              {/*Ruta publica*/}
              <Route index element={<Home />} />
              <Route path="login" element={ <Login /> } />
              <Route path="registrar" element={ <Registrate /> } />
              <Route path="olvide-password" element={ <OlvidePassword /> } />
              <Route path="olvide-password/:token" element={ <NuevoPassword /> } />
              <Route path="confirmar/:id" element={ <ConfirmarCuenta /> } />
            </Route>
             {/*Ruta privada*/}
            <Route path="/dashboard" element={ <RutaProtegida /> }>
                <Route index element={ <Dashboard /> } />
                <Route path='configuracion' element={ <Configuracion /> } />
            </Route>
          </Routes>
        </div>
    )

};

export default AppContent;