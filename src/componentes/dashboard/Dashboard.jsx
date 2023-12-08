import React, { Suspense } from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
// import "bootstrap-icons/font/bootstrap-icons.css"
import axios from 'axios'
import VenderEntrada from './VenderEntrada'

const Dashboard = () => {

  const {id} = useParams()

  return (
    <div className='container-fluid '>
      <div className='row flex-nowrap '>
        <div className='col-auto col-md-3 col-xl-2 px-sm 2 px-0  j'>
          <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
              <Link 
               className='d-flex align-items-center pb-3 mb-md-3 me-md-auto text-white text-decoration-none' to={'/dashboard/fiesta/'+ id}>
                <span className='fs-5 fw-bolder d-none d-sm-inline'>PartyHUB</span>
              </Link>
             <ul id='menu' className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center '>
               <li className='w-100'>
                 <Link className='nav-link text-white px-10 align-middle' to={'/dashboard/fiesta/'+ id}>
                   <i className='fs-4 bi-speedometer2 ms2'></i>
                   <span className='ms-2 d-none d-sm-inline'> Dashboard</span> 
                 </Link>
               </li>
               <li className='w-100'>
                 <Link className='nav-link px-0 align-middle text-white' to={'/dashboard/vendedores/'+ id}>
                    <i className='fs-4 bi-people ms-2'></i>
                    <span className='ms-2 d-none d-sm-inline'>Vendedores</span>
                 </Link>
               </li>              
                <li className='w-100'>
                  <Link className='nav-link px-0 align-middle text-white' to={'/dashboard/lotes/'+ id}>
                    <i className='fs-4 bi-columns ms-2'></i>
                    <span className='ms-2 d-none d-sm-inline'>Lotes</span>
                    
                    </Link>
               </li>
               <li className='w-100'>
               <Link className='nav-link px-0 align-middle text-white'>
                    <i className='fs-4 bi-person ms-2'></i>
                    <span data-bs-toggle="modal" data-bs-target="#sellPartyModal" className='ms-2 d-none d-sm-inline'>Vender entrada</span>
                </Link>
               </li>
               <li className='w-100'>
                  <Link   to='/home' className='nav-link px-0 align-middle text-white' >
                    <i className='fs-4 bi-power ms-2'></i>
                    <span className='ms-2 d-none d-sm-inline'>Back to parties</span>
                  </Link>
               </li>
             </ul>
          </div>
        </div>
        <div className='col p-0 m-0'>
           <div className='p-2 d-flex justify-content-center shadow'>
             <h4 >FiestaHub</h4>
             
           </div>
           
            <Outlet/>
          
           <VenderEntrada/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard