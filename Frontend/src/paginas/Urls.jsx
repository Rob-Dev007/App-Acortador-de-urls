import  { FaTrashAlt, FaCog, FaClipboard } from 'react-icons/fa';
import  { HiBarsArrowUp } from 'react-icons/hi2';
import useUrl from '../hooks/useUrl';
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';
import { useState } from 'react';

const Urls = ({ url, mostrarFormEditar })=>{

    const { urlDestino, customUrl, descripcion, clicks: initialClicks, createdAt } = url;
    const { eliminarUrl } = useUrl();

    const [ clicks, setClicks ] = useState(initialClicks);
    

    const fechaFormateada = new Date(createdAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    
    const handleLinkClick = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            }
            // Llama a la API para incrementar los clics
            const { data }  = await clienteAxios.get(`/urls/clicks/${ customUrl }`, config);

            window.open(data.urlDestino, "_blank");
            
            //Actualizar el estado con el nuevo numero de clicks;
            setClicks(data.clicks);
        } catch (error) {
            console.error('Error al incrementar los clicks:', error);
        }
    };

    const showAlert = ()=>{
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
    }

    const handleCopy = ()=>{
        navigator.clipboard.writeText(urlDestino)
        .then(()=> showAlert())
        .catch((error) => console.log('Error al copiar el enlace', error))
    }

    const handleEdit = ()=>{
        mostrarFormEditar(url);
    }

    const handleDelete = (id)=>{
        Swal.fire({
            title: "¿Desea eliminar este elemento?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarUrl(id);
                Swal.fire(
                    "Eliminado",
                    "La URL ha sido eliminada correctamente.",
                    "success"
                );
            }
        });
    }

    return(
        <div className='p-4 border-2 rounded-lg shadown-lg my-2'>
            <div className='flex justify-between flex-col md:flex-row'>
                <a className='text-blue-400 font-bold max-w-44 lg:max-w-none' href="#" target='_blank' onClick={ handleLinkClick } >
                    { customUrl }
                </a>
                <div className='flex justify-end md:justify-between items-center gap-1'>
                    <div className='flex items-center gap-1'>
                        <strong><HiBarsArrowUp /></strong>
                        <p className='text-sm lg:text-base'> Clicks: <strong>{ clicks }</strong></p>
                    </div>
                  
                    <button className="p-2 rounded hover:bg-gray-400 transform translate-y-0 transition duration-500 ease-linear" onClick={ handleCopy }>
                        <FaClipboard />
                    </button>
                    <button className="p-2 rounded hover:bg-gray-400 transform translate-y-0 transition duration-500 ease-linear" onClick={ ()=>handleDelete(url._id) }>
                        <FaTrashAlt className='text-red-500'/>
                    </button>
                    <button className="p-2 rounded hover:bg-gray-400 transform translate-y-0 transition duration-500 ease-linear" onClick={ handleEdit }>
                        <FaCog />
                    </button>
                </div>
            </div>
            <div className=''>
                <p className='my-4 text-gray-500 truncate'> { urlDestino }</p>
                <div className='flex gap-4 lg:gap-0 flex-col lg:flex-row justify-between'>
                    <p className='font-semibold break-words'> { descripcion }</p>
                    <p> Creado el: <span className='font-light'>{ fechaFormateada }</span></p>
                </div>
            </div>
        </div>
    )
};

export default Urls;