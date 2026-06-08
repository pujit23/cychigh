import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CycleProvider } from './context/CycleContext';
import { CompareProvider } from './context/CompareContext';
import { BuilderProvider } from './context/BuilderContext';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <AuthProvider>
      <CycleProvider>
        <CompareProvider>
          <BuilderProvider>
            <Toaster 
              position="bottom-right" 
              toastOptions={{
                style: {
                  background: '#1F1F1F',
                  color: '#F0F0F0',
                  fontFamily: '"DM Mono", monospace',
                  fontSize: '12px',
                  borderRadius: '4px',
                  border: '1px border #2A2A2A'
                }
              }}
            />
            <AppRoutes />
          </BuilderProvider>
        </CompareProvider>
      </CycleProvider>
    </AuthProvider>
  );
}

export default App;
