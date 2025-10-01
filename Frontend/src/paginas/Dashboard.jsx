import { useEffect, useState } from 'react';
import { ImFilesEmpty } from 'react-icons/im';
import { FaSearch } from 'react-icons/fa';

import Alerta from '../helpers/Alerta'
import Urls from './Urls';
import Input from '../utils/input';

import UseTheme from '../hooks/UseTheme';
import useUrl from '../hooks/useUrl';
import Pagination from "../components/pagination";

const Dashboard = ()=>{

    const [ mostrarForm, setMostrarForm ] = useState(false);
    const [ formData, setFormData ] = useState({
        urlDestino : '',
        customUrl: '',
        descripcion: ''
    });

    const [ id, setId ] = useState(null);
    const [ alerta, setAlerta ] = useState({});
    const { theme } = UseTheme();

    const { guardarUrl, urlRecortada, editarUrl, search, setSearch, fetchUrls } = useUrl();
    const { urlDestino, customUrl, descripcion } = formData; 

    useEffect(()=>{
        fetchUrls();
    },[])

    const handleSubmit = async e =>{
        e.preventDefault();

        if(!urlDestino){
            setAlerta({ 
                msg: 'URL es obligatorio',
                error : true 
            })

            setTimeout(()=>{
                setAlerta({});
            },4000)
            return;
        };

        const datos = { urlDestino, customUrl, descripcion };
      
        if (id) {
          // Si hay un id, significa que estamos editando
          try {
            await editarUrl(id, datos); // Llama a la función para editar la URL
            setAlerta({ 
                msg: 'URL editada correctamente', 
                error: false 
            });
          } catch (error) {
            setAlerta({ 
                msg: 'Hubo un error al editar la URL', 
                error: true 
            });
          }
        } else {
            try {
                // Si no hay id, significa que estamos creando
                await guardarUrl(datos);
                setAlerta({
                    msg: 'Url creada correctamente',
                    error: false
                })
            } catch (error) {
                setAlerta({
                    msg: 'Error al crear la Url',
                    error: true
                })
            }    
        }
      
        // Resetea el formulario
        setFormData({
            urlDestino: '',
            customUrl: '',
            descripcion: ''
        });
        setId(null);
        setMostrarForm(false);

        setTimeout(()=>{
            setAlerta({});
        },4000)
    }

    const mostrarFormEditar = (url) => {
        setId(url._id); // Establece el ID de la URL que quieres editar
        setFormData({
            urlDestino: url.urlDestino || '',
            customUrl: url.customUrl || '',
            descripcion: url.descripcion || ''
        })
        setMostrarForm(true); 
    };

    const searchLink = (e)=>{
        setSearch(e.target.value);
    }

    const handleEvent = (e)=>{
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })

        if(value.trim() !== ''){
            setAlerta({});
        }

    }

    const { msg } = alerta;

    return(
        <div className='min-h-screen'>
            <div className='flex justify-between items-center mx-2'>
                <div className="input-container">
                    <input 
                    className= {`${theme === 'dark' ? 'bg-stone-800' : 'bg-white'} input-box`} 
                    type="search" 
                    placeholder="Link personalizado"
                    value={ search }
                    onChange={ searchLink }
                    />
                        <FaSearch className="input-icon"/>
                </div>
                <div>
                    <button 
                    className="px-3 py-2 md:px-4 md:py-2 border-2 font-bold rounded-xl text-sm md:text-base hover:bg-cyan-600 hover:text-white transition-all duration-300"
                    onClick={ ()=> setMostrarForm(true) }
                    >
                        Crear link
                    </button>
                </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-1 md:gap-4 my-2 lg:my-4 mx-2'>
                    {
                         // Si no hay un término de búsqueda, muestra todos los elementos
                         urlRecortada.length > 0 ? (
                            <>
                                {urlRecortada.map((url) => (
                                    <Urls
                                        key={url._id}
                                        url={url}
                                        mostrarFormEditar={mostrarFormEditar}
                                    />
                                ))}
                            </>
                        ) : (
                            // Si no hay elementos para mostrar
                           <div className="flex flex-col justify-center items-center gap-4 py-16 sm:py-24 col-span-full text-center">
                                <ImFilesEmpty className='text-6xl' />
                                <h2 className='text-2xl font-bold'>Sin enlaces por el momento</h2>
                                <button
                                    className='border-4 p-2 rounded-xl uppercase font-bold hover:bg-cyan-600 hover:text-white transition-all duration-500 transform ease-out font-bold my-2'
                                    onClick={() => setMostrarForm(true)}
                                >
                                     Crear link
                                </button>
                            </div>
                        )
                        
                    }
            </div>
            {mostrarForm && 
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center">
                    <form 
                        className={`${mostrarForm ? 'block' : 'hidden'} 
                        ${theme === 'dark' ? 'bg-stone-800' : 'bg-white'} 
                        flex flex-col gap-4 w-11/12 sm:w-3/4 lg:w-1/3 max-h-[90vh] overflow-y-auto px-4 py-6 rounded-xl mx-auto`}
                        onSubmit={ handleSubmit }
                     >
                    <Input label="Url destino" type="text" name="urlDestino" value={ urlDestino } changeEvent={ handleEvent } placeholder={"Ingresa el enlace a recortar"}/>
                    <Input label="Alias Url (Opcional)" type="text" name="customUrl" value={ customUrl } changeEvent={ handleEvent } placeholder={"Personaliza tu URL recortado"}/>
                    <Input label="Descripción (Opcional)" as="textarea" name="descripcion" value={ descripcion } changeEvent={ handleEvent } placeholder={"Ingresa una descripcion de tu URL"}/>
                    <div className='flex justify-between'>
                        <button
                        type='button'
                        className="block text-center mt-3 text-lg rounded-full border-4 px-4 hover:bg-red-500 hover:text-white transition-all duration-500 transform ease-out font-bold my-2" 
                        onClick={ ()=> setMostrarForm(false) }
                        >
                            Cancelar 
                        </button>
                        <input
                        className='hover:text-indigo-500 font-black cursor-pointer'
                        type="submit"
                        value={id ? "Editar URL" : "Crear URL"}
                        />
                    </div>
                    { msg && 
                        <Alerta 
                            alerta = { alerta }
                        />
                    }
                    </form>
            </div>
            }
            <Pagination />
        </div>
    )
};

export default Dashboard