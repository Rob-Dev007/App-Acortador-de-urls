import { Routes, Route } from "react-router-dom";
import { useTheme } from "./themeProvider";
import Header from "./header";
import Dashboard from './dashboard';
import Home from './home';
import Footer from './footer';
import Configuracion from './configuracion'



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
          </Routes>
        <Footer />
    </div>

    )

};

export default AppContent;