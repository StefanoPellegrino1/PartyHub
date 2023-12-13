import React from 'react'
import supabase from '../../back/supabaseClient'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    let navigate = useNavigate()

    const salir = async () => {
        sessionStorage.removeItem('token')
        navigate('/')
    }
    
    
      return (
        <div className='boton-logout'>
            <button onClick={salir} className='btn btn-outline-primary'>Logout</button>
        </div>
      )
}

export default Logout