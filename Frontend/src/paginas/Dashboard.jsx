import { useState, useEffect } from 'react';
import { ImFilesEmpty } from 'react-icons/im';
import { FaSearch } from 'react-icons/fa';

import Alerta from '../helpers/Alerta'
import Urls from './Urls';
import clienteAxios from '../config/axios';

import UseTheme from '../hooks/UseTheme';
import useUrl from '../hooks/useUrl';


const Dashboard = ()=>{

    const [ mostrarForm, setMostrarForm ] = useState(false);
    const [ urlDestino, setUrlDestino ] = useState('');
    const [ customUrl, setCustomUrl ] = useState('');
    const [ descripcion, setDescripcion ] = useState('');
    const [ searchQuery, setSearchQuery ] = useState('');
    const [ urlsFiltradas, setUrlsFiltradas ] = useState([]);
    const [ debounceTimeout, setDebounceTimeout ] = useState(null);
    const [ id, setId ] = useState(null);


    const [ alerta, setAlerta ] = useState({});

    const { theme } = UseTheme();
    const { guardarUrl, urlRecortada, editarUrl } = useUrl();

    const handleSubmit = async e =>{
        e.preventDefault();

        if(!urlDestino){
            setAlerta({ 
                msg: 'URL es obligatorio',
                error : true 
            })
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
                    error: true
                })
            } catch (error) {
                setAlerta({
                    msg: 'Error al crear la Url',
                    error: false
                })
            }
          
          
        }
      
        // Resetea el formulario
        setUrlDestino('');
        setCustomUrl('');
        setDescripcion('');
        setId(null);
        setMostrarForm(false);

        setAlerta({});
    }

    const mostrarFormEditar = (url) => {
        setId(url._id); // Establece el ID de la URL que quieres editar
        setUrlDestino(url.urlDestino || '');
        setCustomUrl(url.customUrl || '');
        setDescripcion(url.descripcion || '');
        setMostrarForm(true); 
    };

    useEffect(() => {
        if (searchQuery.length > 0) {
            // Limpiar el timeout anterior si el usuario está escribiendo
            if (debounceTimeout) clearTimeout(debounceTimeout);

            // Establecer un nuevo timeout para hacer la solicitud después de un delay
            const timeout = setTimeout(() => {
                // Llamar a la API para obtener las URLs filtradas
                const fetchUrls = async () => {
                    try {

                        const token = localStorage.getItem('token');
                        const config = {
                            headers : {
                            "Content-Type" : "application/json",
                            Authorization : `Bearer ${token}`
                            }
            }
                        const { data } = await clienteAxios.get(`/urls/search/searchTerm?query=${searchQuery}`, config );
                        setUrlsFiltradas(data);
                    } catch (error) {
                        console.error('Error al buscar URLs:', error);
                        setAlerta({ msg: 'Error al buscar las URLs', error: true });
                    }
                };

                fetchUrls();
            }, 300);  // Retrasa la búsqueda 500 ms después de que el usuario deja de escribir

            // Guardar el timeout para cancelarlo si el usuario sigue escribiendo
            setDebounceTimeout(timeout);
        } else {
            setUrlsFiltradas([]);
        }

        // Limpiar el timeout cuando el componente se desmonte
        return () => clearTimeout(debounceTimeout);
    }, [searchQuery]);

    const { msg } = alerta;

    return(
        <div className=''>
            <div className='flex justify-between items-center mx-2 lg:mx-0'>
                <div className="input-container">
                    <input 
                    className= {`${theme === 'dark' ? 'bg-stone-800' : 'bg-white'} input-box`} 
                    type="search" 
                    placeholder="Link personalizado"
                    value={ searchQuery }
                    onChange={ e=>setSearchQuery(e.target.value) }
                    />
                        <FaSearch className="input-icon"/>
                </div>
                <div>
                    <button 
                    className='p-2 border-2 font-bold rounded-xl'
                    onClick={ ()=> setMostrarForm(true) }
                    >
                        Crear link
                    </button>
                </div>
            </div>
            <div className='md:grid lg:grid-cols-2 gap-4 my-12 mx-2'>
                <>
                    {searchQuery ? (
                        urlsFiltradas.length > 0 ? (
                            urlsFiltradas.map((url) => (
                                <Urls 
                                    key={url._id}
                                    url={url}
                                    mostrarFormEditar={mostrarFormEditar}
                                />                         
                            ))
                        ) : (
                            <div className="mx-auto">
                                <h2 className="text-2xl font-bold text-center mx-auto">Sin enlaces por el momento</h2>
                            </div>
                        )
                    ) : (
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
                            <div className='flex flex-col items-center gap-4'>
                                <ImFilesEmpty className='text-6xl' />
                                <h2 className='text-2xl font-bold'>Sin enlaces por el momento</h2>
                                <button
                                    className='border-4 p-2 rounded-xl uppercase font-bold hover:bg-slate-500 hover:text-white transition-all duration-500 transform ease-out font-bold my-2'
                                    onClick={() => setMostrarForm(true)}
                                >
                                     Crear link
                                </button>
                            </div>
                        )
                    )
                        
                    }
                </>
            </div>
            {mostrarForm && 
            <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 mx-auto'>
                <div className= 'rounded-xl fixed inset-0 lg:flex mx-auto justify-center items-center z-50'>
                    <form 
                        className={`${mostrarForm ? 'block' : 'hidden'} ${theme === 'dark' ? 'bg-stone-800' : 'bg-white'} flex flex-col gap-4 w-full md:w-3/4 lg:w-1/3 h-2/3 lg:h-3/5 px-4 py-8 rounded-xl mx-auto`}
                        onSubmit={ handleSubmit }
                     >
                    <label 
                    className='font-bold uppercase'
                    htmlFor="Url destino">
                        Url Destino
                    </label>
                    <input 
                    id='Url destino'
                    type="text"
                    value={ urlDestino }
                    onChange={ e => setUrlDestino(e.target.value) }
                    placeholder='Ingresa el enlace a recortar'
                    className={`${ theme === 'dark' ? 'bg-stone-800 placeholder:text-gray-500 border-gray-300 focus:border-gray-600 hover:border-b-gray-50' : 'bg-white placeholder:text-gray-500 border-gray-400 focus:border-black hover:border-b-black'} p-2 rounded outline-none border-b-4 text-xl focus:border-b focus:border-b-4 `}
                    />
                    <label 
                    className='font-bold uppercase'
                    htmlFor="shortUrl">
                        Alias Url (Opcional)
                    </label>
                    <input  
                        id='shortUrl'
                        type="text"
                        defaultValue={ customUrl }
                        onChange={ e => setCustomUrl(e.target.value)}
                        placeholder='Personaliza tu URL recortado'
                        className={`${ theme === 'dark' ? 'bg-stone-800 placeholder:text-gray-500 border-gray-300 focus:border-gray-600 hover:border-b-gray-50' : 'bg-white placeholder:text-gray-500 border-gray-400 focus:border-black hover:border-b-black'} p-2 rounded outline-none border-b-4 text-xl focus:border-b focus:border-b-4 `}
                    />
                    <label
                    className='font-bold uppercase'
                    >
                        Descripcion (Opcional)
                    </label>
                    <textarea
                    value={ descripcion }
                    onChange={ e => setDescripcion(e.target.value) }
                    placeholder='Ingresa una descripcion de tu URL'
                    className={`${ theme === 'dark' ? 'bg-stone-800 placeholder:text-gray-500 border-gray-300 focus:border-gray-600 hover:border-b-gray-50' : 'bg-white placeholder:text-gray-500 border-gray-400 focus:border-black hover:border-b-black'} p-2 rounded outline-none border-b-4 text-xl focus:border-b focus:border-b-4 resize-none h-44`}
                    ></textarea>
                    <div className='flex justify-between'>
                        <button
                        className="block text-center mt-3 text-lg rounded-full border-4 px-4 hover:bg-red-500 hover:text-white transition-all duration-500 transform ease-out font-bold my-2" 
                        onClick={ ()=> setMostrarForm(false) }
                        >
                            Cancelar 
                        </button>
                        <input
                        className='hover:text-gray-400 font-black cursor-pointer'
                        type="submit"
                        value={id ? "Editar URL" : "Crear URL"}
                        />
                    </div>
                    </form>
                </div>
                    { msg && 
                        <Alerta 
                            alerta = { alerta }
                        />
                        
                    }
                    
            </div>
            }
        </div>
    )
};

export default Dashboard