import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {

  RouterProvider,
} from "react-router";

import router from './router/router.jsx';
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient=new QueryClient();

createRoot(document.getElementById('root')).render(
  <div className='font-urbanist max-w-7xl mx-auto '>
    <StrictMode>
    
     <QueryClientProvider client={queryClient}>
         <AuthProvider>
          <RouterProvider router={router} />,
        </AuthProvider>
     </QueryClientProvider>
    
  </StrictMode>,
  </div>
)
