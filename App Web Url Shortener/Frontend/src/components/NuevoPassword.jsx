import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Alerta from "../helpers/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = ()=>{

    const [ password, setPassword ] = useState('');
    const [ tokenValido, setTokenValido ] = useState(false);
    const [ alerta, setAlerta ] = useState({});

    const params = useParams();
    const { token } = params;

    useEffect(()=>{
        const comprobarTkn = async()=>{
            try {
                await clienteAxios(`user/olvide-password/${token}`)
                setAlerta({
                    msg: 'Ingresa tu nueva contraseña'
                });
                setTokenValido(true);
            } catch (error) {
                setAlerta({
                    msg: 'Error al tratar de restablecer contraseña',
                    error: true
                })
                setTokenValido(false);
            }
        };
        comprobarTkn();
    },[]);

    const handleSubmit = async e =>{
        e.preventDefault();
        
    }
    
    const { msg } = alerta;
    return(
        <div id="olvide-password/:token" className="container h-screen mx-auto p-8 grid grid-col items-center justify-center">
        <h2 className="font-bold text-3xl my-18 text-center">Restablece tu contraseña</h2>
            <div className="shadow-xl rounded-xl px-4 py-8 gap-2">
                { msg && <Alerta 
                    alerta = { alerta }
                />}
                { tokenValido &&(
                    <form 
                        onSubmit={ handleSubmit }
                        className="flex flex-col w-full gap-4">
                            <label className="font-bold my-2">Nueva contraseña</label>
                            <input 
                                type="password"
                                name="password"
                                value={ password }
                                onChange={ e => { setPassword(e.target.value) } }
                                placeholder="Ingresa tu nueva contraseña"
                                className="bg-gray-400 p-2 rounded outline-none border-b-4 border-b-gray-500 text-xl placeholder:text-xl focus:border-b focus:border-black focus:border-b-4 hover:border-black placeholder:text-white"
                            />
                            <input 
                                type="submit"
                                value="Restablecer contraseña"
                                className="my-3 border-2 rounded bg-gray-400 text-xl p-2 md:w-60 justify-center hover:bg-slate-500 font-bold"
                            />
                    </form>
                )}   
            </div>   
        </div>
    )

};

export default NuevoPassword;