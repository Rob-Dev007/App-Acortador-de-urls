import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../helpers/Alerta";
import clienteAxios from "../config/axios";
import UseTheme from "../hooks/UseTheme";
import Input from "../utils/input";
import Button from "../utils/button";

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

    const changeEvent = ()=>{
        setCorreo(e.target.value);
    }

    const { msg } = alerta;

    return(
        <div id="olvide-password" className="md:mx-auto p-2 flex flex-col items-center justify-center">
            <h2 className="font-bold text-4xl text-center text-secondary my-8 md:my-12">Recupera tu cuenta</h2>
            {msg && <Alerta 
                alerta={ alerta }
            />}
            <form 
                onSubmit={ handleSubmit }
                className={`${theme ==='dark' ? 'bg-black/25' : 'bg-white'} flex flex-col px-6 py-8 gap-2 shadow-xl rounded-xl my-24`}>
                <Input label={"Correo"} type={"email"} name={"correo"} value={ correo } changeEvent={ changeEvent } placeholder={"Ingresa tu correo"}/>
                <Button type={"submit"} className="block text-center mt-3 text-lg rounded-full border-4 p-2 hover:bg-gradient-to-r from-secondary to-accent hover:text-white transition-all duration-500 transform ease-out font-bold my-2">Enviar instrucciones</Button>
                <nav className="md:flex md:justify-between gap-4">
                    <Link to='/Login'  className="block text-center my-1 text-sm hover:text-gray-500">¿Ya tienes una cuenta? <strong>Ingresa</strong></Link>
                    <Link to='/registrar'  className="block text-center my-1 text-sm hover:text-gray-500">¿No tienes una cuenta? <strong>Registrate</strong></Link>
                </nav>
            </form>
            
        </div>
    )
    
};

export default OlvidePassword;