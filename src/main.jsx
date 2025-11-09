import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={true}
      closeOnClick
      pauseOnHover={false}
      draggable={false}
      toastStyle={{
        fontSize: '13px',
        padding: '6px 10px',
        borderRadius: '8px',
        background: '#333',
        color: '#fff',
      }}
      bodyClassName={() => 'flex items-center'}
    />
  </StrictMode>,
)
