import { Link } from "react-router-dom";
import { FaCut } from "react-icons/fa";
import { useState } from "react";
import { FaClipboard } from "react-icons/fa";
import Swal from "sweetalert2";
import UseTheme from "../hooks/UseTheme";
import Alerta from "../helpers/Alerta"
import clienteAxios from "../config/axios";

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

        try {
            const response = await clienteAxios.post('/public/shorten', { urlDestino } );
            setShortUrl(response.data.shortUrl);
        } catch (error) {
            setAlerta({
                msg: response.data.error.msg,
                error: true
            })
        }
    };

    const showAlerta = ()=>{
        Swal.fire({
            title : '¡Aviso!',
            text : 'Texto copiado correctamente.',
            icon : 'warning',
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

    return(
        <div className="h-min-screen">
            <div className="my-24">
                <h1 className="text-6xl text-center my-8">
                    Acortador de Enlaces
                </h1>
                <h2 className="text-2xl md:text-3xl text-center mx-8 my-20">
                    App web diseñada para acortar enlaces, registrate y podrás almacenar y administrar tus enlaces
                </h2>
            </div>
            <div className="mx-4 md:mx-28 lg:mx-96">
                <form
                onSubmit={ handleSubmit }
                >
                    <input 
                        className={`${ theme === 'dark' ? 'bg-gradient-to-r from-stone-700 to-transparent' : 'bg-gradient-to-b from-stone-300 to-transparent ' } flex h-12 w-full bg-gradient-to-tr from-stone-200 to-transparent outline-none p-3 rounded-md md:text-xl text-lg`}
                        placeholder="Recorta tu url"
                        type="url"
                        value={ urlDestino }
                        onChange={ e => setUrlDestino(e.target.value) }/>
                    <div className="flex justify-end mt-3 md:mt-2 gap-8">
                        <input 
                        type="submit"
                        value='Acorta el Url'
                        className='flex items-center justify-center bg-slate-600 md:p-3 p-2 text-white rounded-lg font-bold text-sm lg:text-lg hover:bg-slate-500 transform duration-500 ease-out cursor-pointer'
                        />
                        
                    </div>
                </form>
                <div className="flex justify-center mt-4">
                    {msg && <Alerta 
                        alerta={ alerta }
                    />}
                </div>
                
                {shortUrl && (
                <div className="flex flex-col lg:flex-row w-full justify-center gap-3 mt-8 md:mt-3 items-center">
                    <p>URL acortada:</p>
                        <a href={ shortUrl } target="_blank" rel="noopener noreferrer"><strong>{ shortUrl }</strong></a>
                        <button 
                        className="bg-green-500 h-8 w-8 flex justify-center items-center rounded-md"
                        onClick={ copyLink }
                        ><FaClipboard /></button>
                </div>
                )}
            </div>

            <div className="flex w-full justify-center items-center">
                <Link to="/login" className="btn">Gestiona tus enlaces</Link>
                <Link to="https://github.com/Rob-Dev007/AppWebUrlShortener" 
                className="btn"
                target="_blank">Empieza en github</Link>
            </div>

        </div>
    )

};

export default Home;