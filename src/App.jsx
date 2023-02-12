import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './Routes/Routes'

function App() {

  return (
    <div className='max-w-[1200px]  mx-auto bg-gray-900'>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </div>
  )
}

export default App
