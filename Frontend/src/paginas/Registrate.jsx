import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../helpers/Alerta.jsx";
import clienteAxios from "../config/axios.jsx";
import UseTheme from "../hooks/UseTheme.jsx"; 
import Input from "../utils/input.jsx"
import Button from "../utils/button.jsx"

const Registrate = ()=>{

    const [ formData, setFormData ] = useState({
        nombres: '',
        apellidos: '',
        correo: '',
        password: '',
        repetirPassword: ''
    })

    const [ alerta, setAlerta ] = useState({});
    const { theme } = UseTheme();

    const { nombres, apellidos, correo, password, repetirPassword } = formData;
    
    const handleSubmit = async e=>{
        e.preventDefault();
        
        if( [nombres, apellidos, correo, password, repetirPassword].includes('') ){
            setAlerta({msg:'Todos los campos son obligatorios', error: true});
            return;
        };
    
        if(password !== repetirPassword){
            setAlerta({msg: 'Las contraseñas no coinciden', error: true});
            return;
        };
    
        if(password.length < 8){
            setAlerta({msg:'La contraseña debe contener minimo 8 caracteres', error: true});
            return;
        };

        setAlerta({});

        //Crear el usuario en la API
        
        try{
            await clienteAxios.post('/user', { nombres, apellidos, correo, password })
            setAlerta({ msg:'Usuario agregado correctamente, revisa tu correo', error: false }) 

            setFormData({
            nombres: '',
            apellidos: '',
            correo: '',
            password: '',
            repetirPassword: ''
        });
        }catch(error){
            setAlerta({ msg: error.response.data.msg , error: true })
        }
    };

    const handleEvent = (e)=>{
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const { msg } = alerta;

    return(
        <div id="registrar" className="container mx-auto p-4 md:grid md:grid-col justify-center items-center">
            <h2 className="font-bold text-4xl text-center text-secondary my-8 md:my-12">Registrate</h2>
            {msg && <Alerta 
                alerta={ alerta }
            /> }
            <form 
            onSubmit={ handleSubmit }
            className={`${theme ==='dark' ? 'bg-black/25' : 'bg-white'} flex flex-col p-4 gap-2 shadow-xl rounded-xl `}>
                <Input label={"Nombres"} type={"text"} name={"nombres"} value={nombres} changeEvent={ handleEvent } placeholder={"Ingresa tus nombres"}/>
                <Input label={"Apellidos"} type={"text"} name={"apellidos"} value={apellidos} changeEvent={ handleEvent } placeholder={"Ingresa tus apellidos"}/>
                <Input label={"Correo"} type={"email"} name={"correo"} value={correo} changeEvent={ handleEvent } placeholder={"Ingresa tu correo"}/>
                <Input label={"Contraseña"} type={"password"} name={"password"} value={password} changeEvent={ handleEvent } placeholder={"Ingresa tu contraseña"}/>
                <Input label={"Repetir contraseña"} type={"password"} name={"repetirPassword"} value={repetirPassword} changeEvent={ handleEvent } placeholder={"Repite tu contraseña"}/>
                <Button type={"submit"} className="block text-center mt-3 text-lg rounded-full border-4 p-2 hover:bg-gradient-to-r from-secondary to-accent hover:text-white transition-all duration-500 transform ease-out font-bold my-2">Registrate</Button>
                <nav className="md:flex md:justify-between gap-6">
                    <Link to='/login' className="block text-center my-1 text-sm hover:text-gray-500">¿Ya tienes una cuenta? <strong>Ingresa</strong></Link>
                    <Link to='/olvide-password' className="block text-center my-1 text-sm hover:text-gray-500">¿Olvidaste tu contraseña? <strong>Recuperala</strong></Link>
                </nav>
            </form>
        </div>
    )
};

export default Registrate;