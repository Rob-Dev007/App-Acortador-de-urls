import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children })=>{
    const [ theme, setTheme ] = useState('light');

    const lightTheme = ()=> setTheme('light');
    const darkTheme = ()=> setTheme('dark');

    const detectSystem = ()=>{
      if(window.matchMedia && window.matchMedia('prefers-color-scheme: dark').matches){
        setTheme('dark');
      }else{
        setTheme('light');
      }
    };

    useEffect(()=>{
      detectSystem();

      const mediaQuery = window.matchMedia(('prefers-color-scheme : dark'));

      mediaQuery.addEventListener('change', detectSystem);

      return()=>{
        mediaQuery.removeEventListener('change', detectSystem);
      }
    },[])

    return(
        <ThemeContext.Provider 
        value={
          { 
            theme, 
            setTheme,
            darkTheme,
            lightTheme,
            detectSystem
          }
          }>
            { children }
        </ThemeContext.Provider>

    );
};

export default ThemeContext;