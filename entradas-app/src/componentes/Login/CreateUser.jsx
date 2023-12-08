import React, { useState } from 'react'
import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../../back/supabaseClient'
import Logo from './1.png'


const CreateUser = () => {

    
    const [error, setError] = useState(null);
    const navigation = useNavigate(null)

    const[values, setValues] = useState({
        email: '',
        password: '',
        fullname: ''
    })




    const handleSubmit = async (event) => {
        event.preventDefault()


        if(!values.email || !values.password || !values.fullname){
            setError('Completa todos los campos')
            return
          }
    const createAccount = async (event) => {
            let { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options:{
            data:{
                full_name: values.fullname
                
            }

            
        }

  })

  const { dataa, errorr } = await supabase
  .from('Usuarios')
  .insert([{nombreYapellido:values.fullname, contraseña:values.password, mail:values.email}]);


  if(error){
   
    console.log(error)
  }else{
    alert('Check your email for verification link')
    console.log(dataa)
    
    navigation('/')
  }
    } 
    createAccount()

}
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'> 
    
            <div className='p-3 rounded w-25 border loginForm'>
            {/* <div className="imagen-logo">
                    <img src={Logo} alt="d" srcset="" />
                </div> */}
                <div className='text-danger'>
                    {error && error}
                </div>
                <h2>Create Account</h2>
                <form className='form' autoComplete="off" onSubmit={handleSubmit}> 
                <div className='mb-3'>
                        <label htmlFor='email'>Fullname</label>
                        <input  name="email" autoComplete='off' placeholder='Enter Fullname' 
                        onChange={(e)=>setValues({...values, fullname: e.target.value})}     className='form-control rounded-0' />
                    </div>
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
                    <button className='btn color w-100 rounded-0 mb-2'>Register</button>
                    <div className='mb-1'>   
                        <span>Have an account?</span>
                        <Link to='/' className='create'>Log in</Link>
                    </div>
                </form>
            </div>
    
        </div>
  )
}

export default CreateUser