import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../helpers/Alerta";
import clienteAxios from "../config/axios";
import UseTheme from "../hooks/UseTheme";
import Input from "../utils/input";
import Button from "../utils/button";

const NuevoPassword = ()=>{

    const [ password, setPassword ] = useState('');
    const [ tokenValido, setTokenValido ] = useState(false);
    const [ passwordModificado, setPasswordModificado ] = useState(false);
    const [ alerta, setAlerta ] = useState({});

    const { theme } = UseTheme();

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

        if(password.length < 8){
            setAlerta({
                msg: 'Password debe contener minimo 8 caracteres', 
                error: true
            })
            return
        };

        setPasswordModificado(true);

        try{
            const url =`user/olvide-password/${token}`;
            const {data} = await clienteAxios.post(url, { password });

            setAlerta({
                msg: data.msg
            })
        }catch(error){
            setAlerta({
                msg: error.responde.data.msg,
                error: true
            })
        }

    }

    const handleChange = (e)=>{
        setPassword(e.target.value);
    }

    const { msg } = alerta;
    return(
        <div id="olvide-password/:token" className="container mx-auto p-8 grid grid-col items-center justify-center">
        <h2 className="font-bold text-4xl text-center text-secondary my-8 md:my-12">Restablece tu contraseña</h2>
            <div className="shadow-xl rounded-xl px-4 py-8 gap-2">
                { msg && <Alerta 
                    alerta = { alerta }
                />}
                { tokenValido &&(
                    <>
                        <form 
                        onSubmit={ handleSubmit }
                        className="flex flex-col w-full gap-4 my-24">
                           <Input label={"Nueva contraseña"} type={"password"} name={"password"} value={ password } changeEvent={ handleChange } placeholder={"Ingresa tu nueva contraseña"}/>
                            <Button type={"submit"} className="block text-center mt-3 text-lg rounded-full border-4 p-2 hover:bg-gradient-to-r from-secondary to-accent hover:text-white transition-all duration-500 transform ease-out font-bold my-2">Restablecer contraseña</Button>
                        </form>
                        { passwordModificado && 
                        <Link to='/login' className="block text-center my-1 text-lg rounded-full border-4 p-2 hover:bg-slate-500 hover:text-white transition-all duration-500 transform ease-out"><strong>Inicia sesión</strong></Link> 
                        } 
                    </>
                )}   
            </div>   
        </div>
    )

};

export default NuevoPassword; 