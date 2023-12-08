import axios from 'axios'

import React, { useEffect, useState} from 'react'
import {  useParams } from 'react-router-dom'
import supabase from '../../../back/supabaseClient'


const Home = () => {
const {id} = useParams()
const iD = id.substr(1)

  const [error, setError] = useState(null)
  const [fiestaFetch, setFiestaFetch] = useState([])

  const [loteActual, setLoteActual] = useState('')
  const [cantidadEntradas, setCantidadEntradas] = useState(0)
  const [cantidadEntradasVendidas, setCantidadEntradasVendidas] = useState(0)
  const [cantidadVendedores, setCantidadVendedores] = useState(0)
  const [recaudacionTotal, setRecaudacionTotal] = useState(0)

  const fiesta = [{
    codigo:'',
    nombre:'',
    fecha:'',
  }]


  useEffect(()=>{

  const fiesta = async () =>{
    const { data, error } = await supabase
    .from('fiesta')
    .select('*')
    .eq('codigo', iD);

   
  if(error){
    setError('No fiesta')
    console.log(error)
    
  }
  if(data == ""){
    
    setError(null)   
    console.log(id)
  }else{
    setFiestaFetch(data)
    
    setError(null)   
  }
    }
    fiesta()

    const estadoLote = async () => {

    const { data, error1 } = await supabase
    .from('Lote')
    .select('*')
    .eq('codigo_fiesta', iD)
    .eq('estado_lote', 'Habilitado')
    

    if(error1){
      throw error1;
    }

    if(data === ''){
      
      let c = "No hay lotes disponibles"
      setLoteActual(c)
    }else{
      
      data.map(L =>{
        setLoteActual(L.nombreLote)
      })
    }
    }

    estadoLote()

   const conteoLote = async () =>{




    const { data, error } = await supabase
    .from('Lote')
    .select('*')
    .eq('codigo_fiesta', iD);

    if(error){
      setError('No fiesta')
      console.log(error)
      
    }
    if(data == ""){
      
      setError(null)   
      
    }else{
      
      
      let c = [];
      let v = [];
      let r = [];

      data.map(e =>{
          c.push(e.cantidadEntradas)
          v.push(e.entradasVendidas)
          r.push(e.recudacion_lote )
          
      })

      const sumWithInitial = c.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      );

      const sumWithInitialVendidas = v.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      );

      const sumWithInitialRecaudacion = r.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      );
      
      setRecaudacionTotal(sumWithInitialRecaudacion)
      setCantidadEntradasVendidas(sumWithInitialVendidas)
      setCantidadEntradas(sumWithInitial)
      setError(null)   
    }
   } 
   conteoLote()


  const cantidadVendodores = async () =>{
    
      const { data:partyData, error } = await supabase
      .from('joined_parties')
      .select('user_id') 
      .eq('party_code', iD)
     
  
      const partyCodes = partyData.map(item => item.user_id);
      
 
       const { data:joinedPartiesData, error: joinedPartiesError } = await supabase
         .from('Usuarios')
         .select('*')
         .in('id_unico', partyCodes);
 

     
    if(error){
      
      console.log(error)
      
    }
    if(joinedPartiesData == ""){
      
       
      console.log('error')
    }else{
      
      
      let numerosVendedores = joinedPartiesData.length
      setCantidadVendedores(numerosVendedores)
    }
      
  }
  cantidadVendodores()




  }, [])
  if(fiestaFetch.length > 0){
  
    fiesta.codigo = fiestaFetch[0].codigo
    fiesta.nombre = fiestaFetch[0].nombre.toUpperCase()
    fiesta.fecha = fiestaFetch[0].fecha
  }
   
   
  return (
    <div className='body'>
      <div className='p-3 d-flex  justify-content-center '>
        <div className='p-3 d-flex flex-column justify-content-center'>
                    <h1 >{fiesta.nombre}</h1>
          <h4 className='ml-5'>{fiesta.fecha}</h4>
        </div>

      </div>

      <div className='p-3 d-flex justify-content-around '>
      
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
         
          <div className="text-center pb-1">
            <h4>Entradas </h4>
          </div>
          <hr />
          <div className="d-flex flex-column justify-content-around">
            <div  className="d-flex  justify-content-around">
             <h5>Entradas Totales</h5>
            <h5>{cantidadEntradas}</h5>
            </div>
            <div  className="d-flex  justify-content-around">
           <h5>Entradas Vendidas: </h5>
            <h5>{cantidadEntradasVendidas}</h5>
            </div>

          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Vendedores</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-around">
            <h5>Total: </h5>
            <h5>{cantidadVendedores}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Plata recaudada:</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-around">
            <h5>Total: </h5>
            <h5>{recaudacionTotal}</h5>
          </div>
        </div>
        
      </div>
       <div className='mt-4 px-5 pt-3 '>
         <h3>INVITATION CODE</h3>
         <h5 className='m-2'>Code: {fiesta.codigo}</h5>
         <button className='btn btn-secondary m-2' onClick={() => navigator.clipboard.writeText(fiesta.codigo)}>Copy Code</button>


       </div > 
       <div className='mt-4 px-5 pt-3 '>
        <h3>Lote actual: </h3>
        <h4 className='m-2'>{loteActual}</h4>
       </div>
       
    </div>
  )
}

export default Home