import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../helpers/Alerta";
import clienteAxios from "../config/axios";

const OlvidePassword = ()=>{

    const [ correo, setCorreo ] = useState('');
    const [ alerta, setAlerta ] = useState({});
    const handleSubmit = async e=>{
        e.preventDefault();

        if(correo === '' || correo.length < 6){
            setAlerta({
                msg: 'Campo vacio, email obligatorio',
                error: true
            });
            return;
        };

        try{
            const { data } = await clienteAxios.post('/user/olvide-password', { correo });
            
            setAlerta({
                msg: data.msg,
                error: false
            })

        }catch(error){
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        };
    }

    const { msg } = alerta;

    return(
        <div id="olvide-password" className="container h-screen mx-auto p-8 flex flex-col items-center justify-center">
            <h2 className="font-bold text-3xl my-24">Recupera tu cuenta</h2>
            {msg && <Alerta 
                alerta={ alerta }
            />}
            <form 
                onSubmit={ handleSubmit }
                className="flex flex-col px-4 py-8 w-[440px] gap-2 shadow-xl rounded-xl">
                <label className="font-bold">Correo</label>
                <input 
                    type="text"
                    name="nombres"
                    value={ correo }
                    onChange={ e => { setCorreo(e.target.value) } }
                    placeholder="Ingresa tus nombres"
                    className="bg-gray-400 p-2 rounded outline-none border-b-4 border-b-gray-500 text-xl placeholder:text-xl focus:border-b focus:border-black focus:border-b-4 hover:border-black placeholder:text-white"
                />
                <input 
                type="submit"
                value="Enviar instrucciones"
                className="my-3 border-2 rounded bg-gray-400 text-xl p-2 md:w-48 justify-center hover:bg-slate-500"
                />
                <nav className="md:flex md:justify-between gap-4">
                    <Link to='/Login' className="block text-center my-4 text-sm">¿Ya tienes una cuenta? <strong>Ingresa</strong></Link>
                    <Link to='/registrar' className="block text-center my-4 text-sm">¿No tienes una cuenta? <strong>Registrate</strong></Link>
                </nav>
            </form>
            
        </div>
    )
    
};

export default OlvidePassword;