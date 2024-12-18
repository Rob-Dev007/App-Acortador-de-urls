import UseAuth from "../hooks/UseAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeaderAdmin from "../components/HeaderAdmin";

import { Outlet, Navigate } from "react-router-dom";

const RutaProtegida=()=>{

    const { auth, cargando } = UseAuth();
    if(cargando) return 'cargando....'

    return (
        <>
            <Header />
                <HeaderAdmin />
                    {auth && auth?._id ? (
                        <main className="container mx-auto mt-20">
                            <Outlet />
                        </main>
                        ) : <Navigate to='/' /> 
                    }
            <Footer />
        </>
    )
};

export default RutaProtegida;