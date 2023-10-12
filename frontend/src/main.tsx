import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
<BrowserRouter>

<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} ><App /></GoogleOAuthProvider>;
</BrowserRouter>
  </React.StrictMode>,
)
