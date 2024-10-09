import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../helpers/Alerta.jsx";
import clienteAxios from "../config/axios.jsx";


const Registrate = ()=>{

    const [ nombres, setNombres ] = useState('');
    const [ apellidos, setApellidos ] = useState('');
    const [ correo, setCorreo ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repetirPassword, setRepetirPassword ] = useState('');

    const [ alerta, setAlerta ] = useState({});

    const handleSubmit = async e=>{
        e.preventDefault();
        
        if( [nombres, apellidos, correo, password, repetirPassword].includes('') ){
            setAlerta({msg:'Existen campos vacios, llene todo el formulario', error: true});
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
        <div id="registrar" className="container mx-auto p-8 md:grid md:grid-col justify-center">
            <h2 className="font-bold text-3xl my-8 text-center">Registrate</h2>
            {msg && <Alerta 
                alerta={ alerta }
            /> }
            <form 
            onSubmit={ handleSubmit }
            className="flex flex-col px-4 py-8 gap-2 shadow-xl rounded-xl">
                <label className="font-bold">Nombres</label>
                <input 
                type="text"
                name="nombres"
                value={ nombres }
                onChange={ e => { setNombres(e.target.value) } }
                placeholder="Ingresa tus nombres"
                className="bg-gray-400 p-2 rounded outline-none border-b-4 border-b-gray-500 text-xl focus:border-b focus:border-black focus:border-b-4 hover:border-black placeholder:text-white"
                />
                <label className="font-bold">Apellidos</label>
                <input 
                type="text"
                name="apellidos"
                value={ apellidos }
                onChange={ e => { setApellidos(e.target.value) } }
                placeholder="Ingresa tus apellidos"
                className="bg-gray-400 p-2 rounded outline-none border-b-4 border-b-gray-500 text-xl placeholder:text-xl focus:border-b focus:border-black focus:border-b-4 hover:border-black placeholder:text-white"
                />
                <label className="font-bold">Correo</label>
                <input 
                type="email"
                name="correo"
                value={ correo }
                onChange={ e => { setCorreo(e.target.value) } }
                placeholder="Ingresa tu email"
                className="bg-gray-400 p-2 rounded outline-none border-b-4 border-b-gray-500 text-xl placeholder:text-xl focus:border-b focus:border-black focus:border-b-4 hover:border-black placeholder:text-white"
                />
                <label className="font-bold">Contraseña</label>
                <input 
                type="password"
                name="password"
                value={ password }
                onChange={ e => { setPassword(e.target.value) } }
                placeholder="Ingresa tu contraseña"
                className="bg-gray-400 p-2 rounded outline-none border-b-4 border-b-gray-500 text-xl placeholder:text-xl focus:border-b focus:border-black focus:border-b-4 hover:border-black placeholder:text-white"
                />
                <label className="font-bold">Repetir contraseña</label>
                <input 
                type="password"
                name="repetirPassword"
                value={ repetirPassword }
                onChange={ e => { setRepetirPassword(e.target.value) } }
                placeholder="Repita la contraseña"     
                className="bg-gray-400 p-2 rounded outline-none border-b-4 border-b-gray-500 text-xl placeholder:text-xl focus:border-b focus:border-black focus:border-b-4 hover:border-black placeholder:text-white"
                />
                <input 
                type="submit"
                value="Registrate"
                className="my-3 border-2 rounded bg-gray-400 text-xl p-2 md:w-44 justify-center hover:bg-slate-500 font-bold"
                />
                <nav className="md:flex md:justify-between gap-4">
                    <Link to='/login' className="block text-center my-1 text-sm">¿Ya tienes una cuenta? <strong>Ingresa</strong></Link>
                    <Link to='/olvide-password' className="block text-center my-1 text-sm">¿Olvidaste tu contraseña? <strong>Recuperala</strong></Link>
                </nav>
            </form>
        </div>
    )
};

export default Registrate;