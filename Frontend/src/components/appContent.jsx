import { Routes, Route } from "react-router-dom";
import { useTheme } from "./themeProvider";

import Dashboard from './Dashboard';
import Home from './home';
import Configuracion from './configuracion'
import Login from "./Login";
import Registrate from "./Registrate";
import ConfirmarCuenta from "./ConfirmarCuenta";
import OlvidePassword from "./OlvidePassword";
import NuevoPassword from "./NuevoPassword";
import HeaderAndFooter from "../layout/HeaderAndFooter";

const AppContent = ()=>{

    const { theme } = useTheme();

    return(
    <div className={`${theme}`}>
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
            <Route path="/dashboard" element={ <Dashboard /> }>
                <Route path='dashboard/configuracion' element={ <Configuracion /> } />
            </Route>
          </Routes>
    </div>

    )

};

export default AppContent;