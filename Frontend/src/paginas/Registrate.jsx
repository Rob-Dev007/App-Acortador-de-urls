import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../helpers/Alerta.jsx";
import clienteAxios from "../config/axios.jsx";
import UseTheme from "../hooks/UseTheme.jsx";


const Registrate = ()=>{

    const [ nombres, setNombres ] = useState('');
    const [ apellidos, setApellidos ] = useState('');
    const [ correo, setCorreo ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repetirPassword, setRepetirPassword ] = useState('');

    const [ alerta, setAlerta ] = useState({});

    const { theme } = UseTheme();

    const handleSubmit = async e=>{
        e.preventDefault();
        
        if( [nombres, apellidos, correo, password, repetirPassword].includes('') ){
            setAlerta({msg:'Todos los campos son obligatorios', error: true});
        };
    
        if(password !== repetirPassword){
            setAlerta({msg: 'Las contraseñas no coinciden', error: true});
        };
    
        if(password.length < 8){
            setAlerta({msg:'La contraseña debe contener minimo 8 caracteres', error: true});
        };

        setAlerta({});

        //Crear el usuario en la API
        
        try{
            await clienteAxios.post('/user', { nombres, apellidos, correo, password })
            setAlerta({ msg:'Usuario agregado correctamente, revisa tu correo', error: false }) 
        }catch(error){
            setAlerta({ msg: error.response.data.msg , error: true })
        }
    };

    const { msg } = alerta;

    return(
        <div id="registrar" className="container mx-auto p-4 md:grid md:grid-col justify-center items-center">
            <h2 className="font-bold text-5xl my-6 text-center">Registrate</h2>
            {msg && <Alerta 
                alerta={ alerta }
            /> }
            <form 
            onSubmit={ handleSubmit }
            className={`${theme ==='dark' ? 'bg-black/25' : 'bg-white'} flex flex-col p-4 gap-2 shadow-xl rounded-xl `}>
                <label className="font-bold">Nombres</label>
                <input 
                type="text"
                name="nombres"
                value={ nombres }
                onChange={ e => { setNombres(e.target.value) } }
                placeholder="Ingresa tus nombres"
                className={`${ theme === 'dark' ? 'bg-stone-800 placeholder:text-gray-500 border-gray-300 focus:border-gray-600 hover:border-b-gray-50' : 'bg-white placeholder:text-gray-500 border-gray-400 focus:border-black hover:border-b-black'} p-2 rounded outline-none border-b-4 text-xl focus:border-b focus:border-b-4 `}
                />
                <label className="font-bold">Apellidos</label>
                <input 
                type="text"
                name="apellidos"
                value={ apellidos }
                onChange={ e => { setApellidos(e.target.value) } }
                placeholder="Ingresa tus apellidos"
                className={`${ theme === 'dark' ? 'bg-stone-800 placeholder:text-gray-500 border-gray-300 focus:border-gray-600 hover:border-b-gray-50' : 'bg-white placeholder:text-gray-500 border-gray-400 focus:border-black hover:border-b-black'} p-2 rounded outline-none border-b-4 text-xl focus:border-b focus:border-b-4  `}
                />
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
                <label className="font-bold">Repetir contraseña</label>
                <input 
                type="password"
                name="repetirPassword"
                value={ repetirPassword }
                onChange={ e => { setRepetirPassword(e.target.value) } }
                placeholder="Repita la contraseña"     
                className={`${ theme === 'dark' ? 'bg-stone-800 placeholder:text-gray-500 border-gray-300 focus:border-gray-600 hover:border-b-gray-50' : 'bg-white placeholder:text-gray-500 border-gray-400 focus:border-black hover:border-b-black'} p-2 rounded outline-none border-b-4 text-xl focus:border-b focus:border-b-4  `}
                />
                <input 
                type="submit"
                value="Registrate"
                className="block text-center my-2 text-lg rounded-full border-4 p-2 hover:bg-slate-500 hover:text-white transition-all duration-500 transform ease-out font-bold"
                />
                <nav className="md:flex md:justify-between gap-6">
                    <Link to='/login' className="block text-center my-1 text-sm hover:text-gray-500">¿Ya tienes una cuenta? <strong>Ingresa</strong></Link>
                    <Link to='/olvide-password' className="block text-center my-1 text-sm hover:text-gray-500">¿Olvidaste tu contraseña? <strong>Recuperala</strong></Link>
                </nav>
            </form>
        </div>
    )
};

export default Registrate;