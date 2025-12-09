import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import ListaVagas from './pages/ListaVagas';
import Entrada from './pages/Entrada';
import Saida from './pages/Saida';
import Consulta from './pages/Consulta';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          
          <Route
            path="/lista-vagas"
            element={
              <ProtectedRoute>
                <ListaVagas />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/entrada"
            element={
              <ProtectedRoute>
                <Entrada />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/saida"
            element={
              <ProtectedRoute>
                <Saida />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/consulta"
            element={
              <ProtectedRoute>
                <Consulta />
              </ProtectedRoute>
            }
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1c1c1e',
            color: '#fff',
            border: '1px solid rgba(1, 98, 227, 0.7)',
          },
          success: {
            iconTheme: {
              primary: '#00C851',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </ThemeProvider>
  );
}

export default App;
