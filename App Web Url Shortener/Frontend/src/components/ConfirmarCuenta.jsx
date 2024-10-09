import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../helpers/Alerta.jsx";
import clienteAxios from "../config/axios.jsx";


const ConfirmarCuenta = ()=>{
    const [ cuentaConfirmada, setCuentaConfirmada ] = useState(false);
    const [ cargando, setCargando ] = useState(true);
    const [ alerta, setAlerta ] = useState({});

    const params = useParams();
    const { id } = params;

    useEffect(()=>{
        const confirmarCuenta = async()=>{
            try{
                const { data } = await clienteAxios(`/user/confirmar/${id}`);

                setAlerta({
                    msg: data.msg,
                    error: false
                });
                setCuentaConfirmada(true);
            }catch(error){
                setAlerta({ 
                    msg: error.response.data.msg, 
                    error: true
                });
            }
            setCargando(false);
        };
        confirmarCuenta();
    },[]);

    return(
        <div id="confirmar" className="container h-screen mx-auto p-8 flex flex-col items-center justify-center">
        <h2 className="font-bold text-3xl mt-24 text-center">Confirma tu cuenta y empieza a gestionar tus enlaces</h2>
            <div className="flex flex-col px-4 py-8 gap-2 shadow-xl rounded-xl">
                {!cargando && 
                    <Alerta 
                        alerta={ alerta }
                    />
                }
                {cuentaConfirmada &&
                (<Link to='/login' className="block text-center my-1 text-lg rounded-full border-4 p-2 hover:bg-slate-500 hover:text-white transform ease-out"><strong>Inicia sesión</strong></Link>)
                }
            </div>   
        </div>
    )

};

export default ConfirmarCuenta;