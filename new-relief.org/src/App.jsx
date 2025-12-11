import './App.css'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from './layouts/RootLayout';
import Landing from './pages/Landing';
import Messages from './pages/Messages';
import Donations from './pages/Donations';
import EventsPage from './pages/EventsPage';
import ContactPage from './pages/ContactPage';

function App() {


  return (

    <div>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<RootLayout/>}>
        <Route index={true} element={<Landing/>}/>
        <Route path='/messages' element={<Messages/>}/>
        <Route path='/donations' element={<Donations/>}/>
        <Route path='/events' element={<EventsPage/>}/>
        <Route path='/contact-us' element={<ContactPage/>}/>
        </Route>
    </Routes>
    
    </BrowserRouter>
</div>
  )
}

export default App

