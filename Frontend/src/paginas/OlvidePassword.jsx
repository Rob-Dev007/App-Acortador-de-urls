import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../helpers/Alerta";
import clienteAxios from "../config/axios";
import UseTheme from "../hooks/UseTheme";

const OlvidePassword = ()=>{

    const [ correo, setCorreo ] = useState('');
    const [ alerta, setAlerta ] = useState({});

    const { theme } = UseTheme();

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
        <div id="olvide-password" className="md:mx-auto p-2 flex flex-col items-center justify-center">
            <h2 className="font-bold text-5xl mt-20 text-center">Recupera tu cuenta</h2>
            {msg && <Alerta 
                alerta={ alerta }
            />}
            <form 
                onSubmit={ handleSubmit }
                className={`${theme ==='dark' ? 'bg-black/25' : 'bg-white'} flex flex-col px-6 py-8 gap-2 shadow-xl rounded-xl my-24`}>
                <label className="font-bold">Correo</label>
                <input 
                    type="text"
                    name="nombres"
                    value={ correo }
                    onChange={ e => { setCorreo(e.target.value) } }
                    placeholder="Ingresa tu correo"
                    className={`${ theme === 'dark' ? 'bg-stone-800 placeholder:text-gray-500 border-gray-300 focus:border-gray-600 hover:border-b-gray-50' : 'bg-white placeholder:text-gray-500 border-gray-400 focus:border-black hover:border-b-black'} p-2 rounded outline-none border-b-4 text-xl focus:border-b focus:border-b-4 `}
                />
                <input 
                type="submit"
                value="Enviar instrucciones"
                className="block text-center my-2 text-lg rounded-full border-4 p-2 hover:bg-slate-500 hover:text-white transition-all duration-500 transform ease-out font-bold"
                />
                <nav className="md:flex md:justify-between gap-4">
                    <Link to='/Login'  className="block text-center my-1 text-sm hover:text-gray-500">¿Ya tienes una cuenta? <strong>Ingresa</strong></Link>
                    <Link to='/registrar'  className="block text-center my-1 text-sm hover:text-gray-500">¿No tienes una cuenta? <strong>Registrate</strong></Link>
                </nav>
            </form>
            
        </div>
    )
    
};

export default OlvidePassword;