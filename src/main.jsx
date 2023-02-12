import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Catagory_Context from './Context/Catagory_Context'

const queryClient = new QueryClient()



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Catagory_Context>
      <App />
      </Catagory_Context>
    </QueryClientProvider>
  </React.StrictMode>,
)
