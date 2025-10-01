import { Link } from "react-router-dom";
import { FaDatabase, FaLink } from "react-icons/fa";
import { useState } from "react";
import { FaClipboard } from "react-icons/fa";
import Swal from "sweetalert2";
import UseTheme from "../hooks/UseTheme";
import Alerta from "../helpers/Alerta"
import clienteAxios from "../config/axios";
import Input from "../utils/input";
import Button from "../utils/button";
import { ImStatsBars } from "react-icons/im";

const Home = ()=>{

    const [ urlDestino, setUrlDestino ] = useState('');
    const [ shortUrl, setShortUrl ] = useState('');
    const [ alerta, setAlerta ] = useState({});

    const { theme } = UseTheme();

    const handleSubmit = async e=>{
        e.preventDefault();

        if(!urlDestino){
            setAlerta({
                msg: '¡ERROR! Url necesario.',
                error: true
            })
            return;
        }

        setAlerta({});

        try {
            const { data } = await clienteAxios.post('/shorten', { urlDestino } );
            setShortUrl(data.shortUrl);
        } catch (error) {
            setAlerta({
                msg: data.error.msg,
                error: true
            })
        }
    };

    const showAlerta = ()=>{
        Swal.fire({
            title : '¡Aviso!',
            text : 'Texto copiado correctamente.',
            icon : 'success',
            confirmButtonText : 'Aceptar',
            customClass :{
                popup: 'custom-popup',
                title: 'custom-title',
                confirmButton: 'custom-confirm-button'
            }
        });
    };

    const copyLink = ()=>{
        navigator.clipboard.writeText(shortUrl)
        .then(()=> showAlerta())
        .catch((error) => console.log('Error al copiar el enlace', error))
    }

    const { msg }= alerta

    const changeEvent = (e)=>{
        const value = e.target.value;
        setUrlDestino(value);

        if(value.trim() !== ''){
            setAlerta({})
        }
    }

    return(
        <div className="flex flex-col items-center justify-center vh-100 mt-12 mx-auto ">
            <div className="flex-1 mx-1">
                <h1 className="text-3xl lg:text-5xl font-semibold text-center mb-4 bg-gradient-to-r from-indigo-400 via-blue-500 to-cyan-600 bg-clip-text text-transparent">
                    Acortador de Enlaces
                </h1>
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center mx-4 my-8 sm:my-16">
                    App web diseñada para acortar enlaces, regístrate y podrás almacenar y administrar tus enlaces
                </h2>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-evenly items-center gap-4">
                <div className="rounded-lg rounded-2xl shadow-xl hover:scale-105 transition bg-gradient-to-br from-cyan-500 via-transparent to-indigo-400 p-4 flex flex-col justify-center items-center gap-3">
                    <FaDatabase className="text-6xl"/>
                    <p className="text-lg font-bold">Almacena tus urls</p>
                </div>
                <div className="rounded-lg rounded-2xl shadow-xl hover:scale-105 transition bg-gradient-to-br from-cyan-500 via-transparent to-indigo-400 p-4 flex flex-col justify-center items-center gap-3">
                    <FaLink className="text-6xl"/>
                    <p className="text-lg font-bold">Personaliza tus urls</p>
                </div>
                <div className="rounded-lg rounded-2xl shadow-xl hover:scale-105 transition bg-gradient-to-br from-cyan-500 via-transparent to-indigo-400 p-4 flex flex-col justify-center items-center gap-3">
                    <ImStatsBars className="text-6xl"/>
                    <p className="text-lg font-bold">Administra tus urls</p>
                </div>
            </div>
            <div className="md:max-w-[440px] lg:max-w-[620px] w-full mt-5">
                <form onSubmit={ handleSubmit }>
                    <Input type={ "url" } value={ urlDestino } changeEvent={ changeEvent } placeholder={ "Recorta la url" }/>
                    <div className="flex justify-end mt-3 md:mt-2 mx-2 gap-8">
                        <Button type={ "submit" } className="flex items-center justify-center bg-cyan-600 md:p-4 p-3 text-white rounded-lg font-bold text-sm lg:text-lg hover:bg-cyan-500 transform duration-500 ease-out cursor-pointer backdrop-blur-md rounded-2xl shadow-lg">Recorta el url</Button>
                    </div>
                </form>
                <div className="flex justify-center mt-4">
                    {msg && <Alerta 
                        alerta={ alerta }
                    />}
                </div>
                
                {shortUrl && (
                <div className="flex flex-col lg:flex-row w-full justify-center gap-3 mt-4 md:mt-3 items-center">
                    <p className="text-sm lg:text-base">URL acortada:</p>
                        <a href={ shortUrl } target="_blank" rel="noopener noreferrer" className="max-w-[260px] sm:max-w-sm truncate font-semibold text-blue-600"><strong>{ shortUrl }</strong></a>
                        <button 
                        className="bg-green-500 h-8 w-8 flex justify-center items-center rounded-md"
                        onClick={ copyLink }
                        ><FaClipboard /></button>
                </div>
                )}
            </div>

            <div className="flex w-full justify-center items-center flex-1">
                <Link to="/login" className="btn">Gestiona tus enlaces</Link>
                <a href="https://github.com/Rob-Dev007/AppWebUrlShortener" 
                className="btn"
                target="_blank">Colabora en código abierto</a>
            </div>

        </div>
    )

};

export default Home;