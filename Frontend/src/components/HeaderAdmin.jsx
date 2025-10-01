import { Link } from "react-router-dom";
import { FaLink, FaCog } from "react-icons/fa";

import UseAuth from "../hooks/UseAuth";

const HeaderAdmin = ()=>{

    const { cerrarSesion } = UseAuth();

    return(
        <header>
            <nav className="flex flex-col md:flex-row md:gap-x-8 justify-center mt-8 gap-y-2 lg:mt-6 items-center">
                <Link className="font-bold text-sm lg:text-xl flex items-center justify-center gap-1 underline-hover" to='/dashboard'>Enlaces <FaLink /></Link>
                <button
                className="mx-auto md:mx-0 my-1 text-sm lg:text-xl rounded-full border-4 px-3 py-1 hover:bg-red-500 hover:text-white transition-all duration-500 transform ease-out font-bold"
                type="button"
                onClick={ cerrarSesion }
                >
                    Cerrar Sesión
                </button>
            </nav>
        </header>
    )

};

export default HeaderAdmin;