import { Routes, Route } from "react-router-dom";
import { useTheme } from "./themeProvider";
import Header from "./header";
import Dashboard from './dashboard';
import Home from './home';
import Footer from './footer';
import Configuracion from './configuracion'
import Login from "./Login";
import Registrate from "./Registrate";
import ConfirmarCuenta from "./ConfirmarCuenta";
import OlvidePassword from "./OlvidePassword";
import NuevoPassword from "./NuevoPassword";

const AppContent = ()=>{

    const { theme } = useTheme();

    return(
    <div className={`${theme}`}>
        <Header />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route >
                <Route path='/dashboard' element={ <Dashboard /> } />
                <Route path='/dashboard/configuracion' element={ <Configuracion /> } />
            </Route>
            <Route>
              <Route path="login" element={ <Login /> } />
              <Route path="registrar" element={ <Registrate /> } />
              <Route path="olvide-password" element={ <OlvidePassword /> } />
              <Route path="olvide-password/:token" element={ <NuevoPassword /> } />
              <Route path="confirmar/:id" element={ <ConfirmarCuenta /> } />
            </Route>
          </Routes>
        <Footer />
    </div>

    )

};

export default AppContent;