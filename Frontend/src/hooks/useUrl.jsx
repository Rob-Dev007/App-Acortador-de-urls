import { useContext } from "react";
import UrlContext from "../context/UrlProvider";

const useUrl = ()=>{
    return useContext(UrlContext);
};

export default useUrl;