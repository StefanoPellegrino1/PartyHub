import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../../back/supabaseClient'
import Logo from './1.png'

const Login = ({setToken, token}) => {
    
    
    const[values, setValues] = useState({
        email: '',
        password: ''
    })

    // function navigate(url){
    //     setPage(url)
    // }
    const [error, setError] = useState(null);
    const navigation = useNavigate(null)
 
    const handleSubmit = async (event) => {
        event.preventDefault()

    if(!values.email || !values.password ){
            setError('Completa todos los campos')
            return
          }
    try{
        let { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
  })

  if(error){
    throw(error)
  }else{
    console.log(data)
    setToken(data)
    navigation('/home')
  }
    } catch(error){
        alert(error)
    }   
    


    }
    
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'> 

        <div className='p-3 rounded border loginForm'>
        {/* <div className="imagen-logo">
                <img src={Logo} alt="d" srcset="" />
            </div> */}
            <div className='text-danger'>
                {error && error}
            </div>
            <h2>Login Page</h2>
            <form className='form' autoComplete="off" onSubmit={handleSubmit}> 
                <div className='mb-3'>
                    <label htmlFor='email'>Email</label>
                    <input type="email" name="email" autoComplete='off' placeholder='Enter Email' 
                    onChange={(e)=>setValues({...values, email: e.target.value})}     className='form-control rounded-0' />
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'>Password</label>
                    <input type="password" name="password" autoComplete='off' placeholder='Enter password' 
                    onChange={(e)=>setValues({...values, password: e.target.value})} className='form-control rounded-0' />
                </div>
                <button className='btn color w-100 rounded-0 mb-2'>Login In</button>
                <div className='mb-1'>   
                    <Link to='/createAccount' className='create'>Create account</Link>
                </div>
            </form>
        </div>

    </div>
  )
}


export default Login