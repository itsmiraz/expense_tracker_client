import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Catagory_Context from './Context/Catagory_Context'
import UserContext from './Context/UserContext'

const queryClient = new QueryClient()



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContext>
        <Catagory_Context>
          <App />
        </Catagory_Context>
      </UserContext>
    </QueryClientProvider>
  </React.StrictMode>,
)
