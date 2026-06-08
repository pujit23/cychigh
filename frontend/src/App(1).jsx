import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CycleProvider } from './context/CycleContext'
import { BuilderProvider } from './context/BuilderContext'
import { CompareProvider } from './context/CompareContext'
import AppRoutes from './AppRoutes'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CycleProvider>
          <CompareProvider>
            <BuilderProvider>
              <Toaster
                position="bottom-right"
                toastOptions={{
                  style: {
                    background: '#0C0C0C',
                    color: '#F0F0F0',
                    border: '1px solid #2A2A2A'
                  }
                }}
              />
              <AppRoutes />
            </BuilderProvider>
          </CompareProvider>
        </CycleProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
