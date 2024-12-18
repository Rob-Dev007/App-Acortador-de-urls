import { useContext } from "react";
import ThemeContext from "../context/themeProvider";

const UseTheme = ()=>{
    return useContext(ThemeContext);
};

export default UseTheme;