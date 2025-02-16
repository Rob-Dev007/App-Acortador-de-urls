import { BrowserRouter }  from 'react-router-dom';
import AppContent from './components/appContent';
import './App.css';

import { AuthProvider } from './context/AuthProvider';
import { ThemeProvider } from './context/themeProvider';
import { UrlProvider } from './context/UrlProvider';

function App() {

  return (
        <BrowserRouter >
          <AuthProvider>
            <UrlProvider>
              <ThemeProvider >
                <AppContent />
              </ThemeProvider >
            </UrlProvider>
          </AuthProvider>   
        </BrowserRouter>
  )
}

export default App
