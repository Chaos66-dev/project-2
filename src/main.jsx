import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { CartProvider } from './Cart/CartContext';
import './index.css'
import App from './App/App.jsx'

createRoot(document.getElementById('root')).render(
    <CartProvider>
        <Router>
            <App />
        </Router>
    </CartProvider>
)
