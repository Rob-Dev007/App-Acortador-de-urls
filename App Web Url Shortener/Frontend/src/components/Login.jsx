import { Link } from "react-router-dom";
import UseAuth from "../hooks/useAuth";
import { useState } from "react";
import Alerta from "../helpers/Alerta";
import clienteAxios from "../config/axios";



const Login = ()=>{

    const { auth } = UseAuth();

    const [ correo, setCorreo] = useState('');
    const [ password, setPassword ] = useState('');
    const [ alerta, setAlerta ] = useState({});

    const handleSubmit = async e=>{
        e.preventDefault();

        if( [correo, password].includes('') ){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return;
        }

        try{
            const { data } = await clienteAxios.post('user/login', { correo, password });

            localStorage.setItem('token', data.token)

            setAlerta({
                msg: data.msg
            })

        }catch(error){
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    };

    const { msg } = alerta;
    return(
        <div id="login" className="container h-screen mx-auto md:grid grid-col justify-center items-center">
             <h2 className="font-bold text-3xl my-4 text-center">Ingresa a tu cuenta</h2>
            { msg && 
            <Alerta 
                alerta={ alerta }
            /> }
            <form 
            onSubmit={ handleSubmit }
            className="flex flex-col px-4 py-8 w-[440px] gap-2 shadow-xl rounded-xl">
                <label className="font-bold">Correo</label>
                <input 
                type="email"
                name="correo"
                value={ correo }
                onChange={ e => { setCorreo(e.target.value) } }
                placeholder="Ingresa tu email"
                className="p-2 rounded outline-none border-b-4 border-b-black text-xl placeholder:text-xl"
                />
                <label className="font-bold">Contraseña</label>
                <input 
                type="password"
                name="password"
                value={ password }
                onChange={ e => { setPassword(e.target.value) } }
                placeholder="Ingresa tu contraseña"
                className="p-2 rounded outline-none border-b-4 border-b-black text-xl placeholder:text-xl"
                />
                <input 
                type="submit"
                value="Inicia sesión"
                className="block text-center my-1 text-lg rounded-full border-4 p-2 hover:bg-slate-500 hover:text-white transition-all duration-500 transform ease-out font-bold"
                />
                <nav className="md:flex md:justify-between gap-4">
                    <Link className="block text-center my-1 text-sm hover:text-black/50" to='/registrar'>¿No tienes una cuenta? <strong> Registrate</strong></Link>
                    <Link className="block text-center my-1 text-sm hover:text-black/50"to='/olvide-password'>¿Olvidaste tu contraseña? <strong>Recuperala</strong></Link>
                </nav>
            </form>
        </div>
    )

};

export default Login;