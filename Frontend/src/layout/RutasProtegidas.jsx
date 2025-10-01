import UseAuth from "../hooks/UseAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeaderAdmin from "../components/HeaderAdmin";

import { Outlet, Navigate } from "react-router-dom";

const RutaProtegida=()=>{

    const { auth, cargando } = UseAuth();
    if(cargando){
        return ( 
            <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-stone-900">
                <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent border-dashed rounded-full animate-spin"></div>
            </div>
      )
    }

    return (
        <>
            <Header />
                <HeaderAdmin />
                    {auth && auth?._id ? (
                        <main className="container mx-auto mt-5">
                            <Outlet />
                        </main>
                        ) : <Navigate to='/' /> 
                    }
            <Footer />
        </>
    )
};

export default RutaProtegida;