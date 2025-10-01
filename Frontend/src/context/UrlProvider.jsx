import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const UrlContext = createContext();

export const UrlProvider = ({ children })=>{

    const [ urlRecortada, setUrlRecortada ] = useState([]);
    const [ alerta, setAlerta ] = useState({});
    const [ page, setPage ] = useState(1);
    const [ limit ] = useState(8);
    const [ totalPages, setTotalPages ] = useState(1);
    const [ search, setSearch ] = useState('');
    const [ debounceSearch, setDebounceSearch ] = useState(search);

    useEffect(()=>{
        const handler = setTimeout(()=>{
            setDebounceSearch(search);
            setPage(1);
        }, 500);

        return ()=>{
            clearTimeout(handler);
        }
    },[search]);

    const fetchUrls = async()=>{
             try {
                const token = localStorage.getItem('token');
                if(!token) return

                const config = {
                    headers:{
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios.get( `/urls?page=${page}&limit=${limit}&search=${debounceSearch}`, config);

                setUrlRecortada(data.urls);
                setTotalPages(data.totalPages);
                return data;
            } catch (error) {
                console.log(error);
            }
        }

    useEffect(()=>{
        fetchUrls();
    },[page, limit, debounceSearch])

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
                fetchUrls,
                guardarUrl,
                editarUrl,
                eliminarUrl,
                alerta,
                page,
                setPage,
                totalPages,
                search,
                setSearch
            }}
        >
            { children }
        </UrlContext.Provider>
    )
};

export default UrlContext;

