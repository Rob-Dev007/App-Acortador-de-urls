import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const UrlContext = createContext();

export const UrlProvider = ({ children })=>{

    const [ urlRecortada, setUrlRecortada ] = useState([]);
    const [ alerta, setAlerta ] = useState({});

    useEffect(()=>{
        const obtenerUrls = async()=>{
            try {
                const token = localStorage.getItem('token');
                if(!token) return

                const config = {
                    headers:{
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/urls', config);
                setUrlRecortada(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerUrls();
    }, [])

    const guardarUrl = async(url)=>{
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/urls', url, config );
            const { __v, updateAt, ...urlAlmacenado  } = data;
            setUrlRecortada((prevUrls) => [urlAlmacenado, ...prevUrls]);

            setAlerta({
                msg: "Url recortada con exito",
                error: false
            })
        } catch (error) {
            console.log(error);
        }
    };

    const editarUrl = async(id, urlActualizada)=>{
        try{
            const token = localStorage.getItem('token');
            const config = {
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/urls/${id}`, urlActualizada, config);

            setUrlRecortada((prevUrls) =>
                prevUrls.map((url) => (url._id === id ? { ...url, ...data } : url))
            );

            setAlerta({
                msg: 'Url actualizada correctamente',
                error: false
            })

        }catch(error){
            console.log(error)
        }
    }

    const eliminarUrl = async(id)=>{
        try{
            const token = localStorage.getItem('token');
            const config = {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }

            await clienteAxios.delete(`/urls/${id}`, config);

            setUrlRecortada((prevUrls) => prevUrls.filter((url) => url._id !== id))
        }catch(error){
            console.log(error);
        }
    }


    return(
        <UrlContext.Provider
            value={{
                urlRecortada,
                guardarUrl,
                editarUrl,
                eliminarUrl,
            }}
        >
            { children }
        </UrlContext.Provider>
    )
};

export default UrlContext;

