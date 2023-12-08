import React, { lazy, useEffect, useState } from 'react';
import './App.css';
import Dashboard  from './componentes/dashboard/Dashboard';
import Login from './componentes/Login/Login';
// import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route, json, useNavigate } from 'react-router-dom';
import HomeCreator from './componentes/dashboard/creator/HomeCreator';
import Vendedores from './componentes/dashboard/creator/Vendedores';
import Lotes from './componentes/dashboard/creator/Lotes';
import Profile from './componentes/dashboard/Profile';
import AddLote from './componentes/dashboard/Add/AddLote'
import Home from './componentes/dashboard/Home';
import CreateUser from './componentes/Login/CreateUser';
import SellerHome from './componentes/seller/SellerHome';
import VenderEntrada from './componentes/dashboard/VenderEntrada';

// const Home = lazy(()=> import('./componentes/dashboard/Home'))
// const HomeCreator = lazy(()=> import('./componentes/dashboard/creator/HomeCreator'))
// const Vendedores = lazy(()=> import('./componentes/dashboard/creator/Vendedores'))
// const Profile = lazy(()=> import('./componentes/dashboard/Profile'))
// const AddLote = lazy(()=> import('./componentes/dashboard/Add/AddLote'))
// const CreateUser = lazy(()=> import('./componentes/Login/CreateUser'))
// const SellerHome = lazy(()=> import('./componentes/dashboard/Home'))
// const Lotes = lazy(()=> import('./componentes/seller/SellerHome'))
// const Dashboard = lazy(()=> import('./componentes/dashboard/Dashboard'))

function App() {
  
  const[token, setToken] = useState(false)
  const[tokenId, setTokenId] = useState(false)

  if(token) {
    sessionStorage.setItem('token', JSON.stringify(token))
    localStorage.setItem('tokenId', JSON.stringify(token.user.id))
  }

  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
      let id = JSON.parse(localStorage.getItem('tokenId'))
      setTokenId(id)
    }
  }, [])

  

  return (
    <div>
  <BrowserRouter>
      <Routes>
      {/* <Route  path='/start' element={<Start/>}></Route>  */}
       <Route  path='' element={<Login token={token} setToken={setToken}/>}></Route> 
       <Route  path='/CreateAccount' element={<CreateUser/>}></Route> 
    {token ? <Route path='home' element={<Home token={token}/>}></Route> : "hola" }
      <Route  path='/dashboard' element={<Dashboard/>}>
      <Route path='fiesta/:id' element={<HomeCreator/>}></Route>
      <Route path='VenderEntrada/:id' element={<VenderEntrada/>}></Route>
      <Route path='vendedores/:id' element={<Vendedores/>}></Route>
   <Route path='lotes/:id' element = {<Lotes/>}></Route>
   <Route path='profile' element = {<Profile/>}></Route>
   <Route path='add_lote/:id' element={<AddLote/>}></Route>

</Route> 
 <Route path='seller/:id' element={<SellerHome  />}></Route>
 <Route path='seller/VenderEntrada/:id' element={<VenderEntrada/>}></Route>
     </Routes> 
  </BrowserRouter>
  </div>
    
    // <div>
    //   <Form/>
    // </div>
  
  );


}

export default App;

