import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import App from './App.tsx'
import './index.css'
import Home from "./Home.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Guesser from "./games/Guesser.tsx";

createRoot(document.getElementById('root')!).render(
    <Router>
      <StrictMode>
        <Home />
          <Routes>
              <Route path="/guesser" element={<Guesser />} />
          </Routes>
      </StrictMode>
    </Router>,
)
