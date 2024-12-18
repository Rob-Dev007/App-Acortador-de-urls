import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import UseAuth from "../hooks/UseAuth";
import UseTheme from "../hooks/UseTheme";
import Alerta from "../helpers/Alerta";
import clienteAxios from "../config/axios";

const Login = ()=>{

    const [ correo, setCorreo] = useState('');
    const [ password, setPassword ] = useState('');
    const [ alerta, setAlerta ] = useState({});

    const navigate = useNavigate();

    const { setAuth } = UseAuth();
    const { theme } = UseTheme();

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
            setAuth(data)
            navigate('/dashboard');

        }catch(error){
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    };

    const { msg } = alerta;
    return(
        <div id="login" className="container mx-auto p-8 md:grid md:grid-col justify-center items-center">
             <h2 className="font-bold text-5xl text-center my-8 md:my-20">Ingresa a tu cuenta</h2>
            { msg && 
            <Alerta 
                alerta={ alerta }
            /> }
            <form 
            onSubmit={ handleSubmit }
            className={`${theme ==='dark' ? 'bg-black/25' : 'bg-white'} flex flex-col px-4 py-8 gap-2 shadow-xl rounded-xl my-10`}>
                <label className="font-bold">Correo</label>
                <input 
                type="email"
                name="correo"
                value={ correo }
                onChange={ e => { setCorreo(e.target.value) } }
                placeholder="Ingresa tu email"
                className={`${ theme === 'dark' ? 'bg-stone-800 placeholder:text-gray-500 border-gray-300 focus:border-gray-600 hover:border-b-gray-50' : 'bg-white placeholder:text-gray-500 border-gray-400 focus:border-black hover:border-b-black'} p-2 rounded outline-none border-b-4 text-xl focus:border-b focus:border-b-4  `}
                />
                <label className="font-bold">Contraseña</label>
                <input 
                type="password"
                name="password"
                value={ password }
                onChange={ e => { setPassword(e.target.value) } }
                placeholder="Ingresa tu contraseña"
                className={`${ theme === 'dark' ? 'bg-stone-800 placeholder:text-gray-500 border-gray-300 focus:border-gray-600 hover:border-b-gray-50' : 'bg-white placeholder:text-gray-500 border-gray-400 focus:border-black hover:border-b-black'} p-2 rounded outline-none border-b-4 text-xl focus:border-b focus:border-b-4  `}
                />
                <input 
                type="submit"
                value="Inicia sesión"
                className="block text-center mt-3 text-lg rounded-full border-4 p-2 hover:bg-gradient-to-r from-gray-600 to-slate-500 hover:text-white transition-all duration-500 transform ease-out font-bold my-2"
                />
                <nav className="md:flex md:justify-between gap-6">
                    <Link className="block text-center my-1 text-sm hover:text-gray-500" to='/registrar'>¿No tienes una cuenta? <strong> Registrate</strong></Link>
                    <Link className="block text-center my-1 text-sm hover:text-gray-500"to='/olvide-password'>¿Olvidaste tu contraseña? <strong>Recuperala</strong></Link>
                </nav>
            </form>
        </div>
    )

};

export default Login;