import { BrowserRouter }  from 'react-router-dom';
;

import './App.css';
import { ThemeProvider } from './components/themeProvider';
import AppContent from './components/appContent';

function App() {


  return (
      <BrowserRouter >
      <ThemeProvider  >
        <AppContent />
      </ThemeProvider >
    </BrowserRouter>
  )
}

export default App
