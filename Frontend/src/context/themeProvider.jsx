import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children })=>{
    const [ theme, setTheme ] = useState('light');

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

    const toggleTheme = ()=>{
      setTheme((prevTheme) => (prevTheme === 'light'? 'dark' : 'light'));
    }

    return(
        <ThemeContext.Provider 
        value={
          { 
            theme, 
            setTheme,
            toggleTheme,
            detectSystem
          }
          }>
            { children }
        </ThemeContext.Provider>

    );
};

export default ThemeContext;