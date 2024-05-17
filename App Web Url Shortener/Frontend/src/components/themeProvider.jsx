import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children, changeTheme })=>{
    const [ theme, setTheme ] = useState('light');

    useEffect(() => {
        const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setTheme(systemPreference);
      }, []);
    
      const setSystemTheme = () => {
        const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setTheme(systemPreference);
      };
    
      useEffect(() => {
        const systemThemeChangeHandler = () => {
          setSystemTheme();
        };
    
        const systemThemeWatcher = window.matchMedia('(prefers-color-scheme: dark)');
        systemThemeWatcher.addEventListener('change', systemThemeChangeHandler);
    
        return () => {
          systemThemeWatcher.removeEventListener('change', systemThemeChangeHandler);
        };
      }, []);
    

    return(
        <ThemeContext.Provider className={ changeTheme } value={{ theme, setTheme }}>
            { children }
        </ThemeContext.Provider>

    )

};

export function useTheme() {
  return useContext(ThemeContext);
}