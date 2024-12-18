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
            setUrlRecortada([urlAlmacenado, ...urlRecortada]);
        } catch (error) {
            console.log(error.response.data.msg)
        }
    };

    return(
        <UrlContext.Provider
            value={{
                urlRecortada,
                guardarUrl
            }}
        >
            { children }
        </UrlContext.Provider>
    )
};

export default UrlContext;

