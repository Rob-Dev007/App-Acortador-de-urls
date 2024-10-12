import { BrowserRouter }  from 'react-router-dom';
;

import './App.css';
import { ThemeProvider } from './components/themeProvider';
import AppContent from './components/appContent';
import { AuthProvider } from './context/AuthProvider';

function App() {


  return (
      
       
        <BrowserRouter >
          <AuthProvider>
            <ThemeProvider  >
              <AppContent />
            </ThemeProvider >
          </AuthProvider>
        </BrowserRouter>
  )
}

export default App
