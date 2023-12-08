import React, { useEffect, useState} from 'react'
import {Link,  useParams } from 'react-router-dom'
import './seller.css'
import supabase from '../../back/supabaseClient'


const SellerHome = () => { 
  let tokenId = JSON.parse(localStorage.getItem('tokenId'))
  const user_id = tokenId

  console.log(user_id)
  
  const {id} = useParams()
  const codigo_fiesta = id.substr(1)

 const [lote, setLote] = useState(user_id)

  const [error, setError] = useState(null)
 
  const [nombreLote, setNombreLote] = useState('')
  const [cantidadDeEntradas, setcantidadDeEntradas] = useState(0)
  const [entradasPedidas, setentradasPedidas] = useState('')
  
  const [precioEntradas, setprecioEntradas] = useState(0)
  const [entradasVendidas, setEntradasVendidas] = useState(0)

  const[nombreFiesta, setnombreFiesta] = useState('')
  const[fechaFiesta, setFechaFiesta] = useState('')

  const[recaudacionActual, setRecaudacionActual] = useState('')

  let precioFinal = precioEntradas * entradasPedidas;
  

  const[entradasTotalesVendedor, setEntradasTotalesVendedor] = useState(0)



  useEffect(()=>{

const fechParty = async () => {
  
    const {data, error} = await supabase
    .from('fiesta')
    .select('*')
    .eq('codigo', codigo_fiesta)
    
    if(error){
      throw error
    }

    if(data){
      setnombreFiesta(data[0].nombre)
      setFechaFiesta(data[0].fecha)
    }

}

fechParty()

  const fetchLote = async () =>{
    const {data, error} = await supabase
    .from('Lote')
    .select('*')
    .eq('codigo_fiesta', codigo_fiesta)
    .eq("estado_lote", 'Habilitado')

  if(error){
    setError('No hay lotes')
    console.log(error)
  
  }else{
     

    if(!data){
      setNombreLote('Lote no disponible')
      setcantidadDeEntradas('Lote no disponible')
      
    }else{
      
           
           data.forEach(l =>{
            setNombreLote(l.nombreLote)
      setcantidadDeEntradas(l.cantidadEntradas)
      setEntradasVendidas(l.entradasVendidas)
      setprecioEntradas(l.precioEntrada)
      setRecaudacionActual(l.recudacion_lote)
      
     })
    }



    setError(null)   
    
  }

}
fetchLote()


  const fetchEntradasVendidas = async () => {
    const {data, error} = await supabase
    .from('joined_parties')
    .select('entradas_vendidas')
    .eq('party_code', codigo_fiesta)
    .eq('user_id', tokenId)
    
    if(error){
      throw error
    }

    if(data){
      setEntradasTotalesVendedor(data[0].entradas_vendidas)
      
    }
  }
  

  fetchEntradasVendidas()















  }, [])


const handleSubmit = async (e) =>{

  e.preventDefault()

  let entradasTotales = parseInt(entradasVendidas) + parseInt(entradasPedidas)
  let recaudacionTotal = parseInt(recaudacionActual+ 0) + parseInt(precioFinal)
  let entradasTotalesNuevo = parseInt(entradasPedidas) + parseInt(entradasTotalesVendedor)

  console.log(entradasTotalesNuevo)


  if (entradasPedidas === ''){
    setError('Ninguna entrada pedida')
    return
}

   if (entradasTotales > cantidadDeEntradas){
        setError('No hay entradas  suficientes en este lote')
        return
    }

    const { data, error } = await supabase
    .from('Lote')
    .update({ entradasVendidas: entradasTotales})
    .eq('codigo_fiesta', codigo_fiesta )
    .eq("estado_lote", 'Habilitado')
    .select()
  
    const { data1, error1 } = await supabase
    .from('Lote')
    .update({ recudacion_lote: recaudacionTotal})
    .eq('codigo_fiesta', codigo_fiesta )
    .eq("estado_lote", 'Habilitado')
    .select()
  
    const { data2, error2 } = await supabase
    .from('Lote')
    .update({ estado_lote: 'Deshabilitado'})
    .eq('codigo_fiesta', codigo_fiesta )
    .eq("estado_lote", 'Habilitado')
    .gte('entradasVendidas', cantidadDeEntradas)
    .select()
  



    const { data3, error3 } = await supabase
    .from('joined_parties')
    .update({ entradas_vendidas: entradasTotalesNuevo})
    .eq('party_code', codigo_fiesta)
    .eq('user_id', user_id)
    .select()
  
    if(error3){
      throw error3
    }

    if(data){
      console.log(data3)
    }

}






return( 

  <div>
    <div className="seller-grande">
      <div className="seller-mediana">
       <Link  to='/home '>
         <span className='ms-3  text-black ' >Back to parties</span> 
       </Link>
        
        <div className="datos-fiesta">
          <h1>{nombreFiesta}</h1>
          <h3>{fechaFiesta}</h3>
        </div>
        <div className="vender-entrada">
         
  {nombreLote === '' ?         
        <div className="entradas-venta">
        
          <h1 className='d-flex justify-content-center'> No tiene lotes</h1>

          </div>

          :

          <div className="entradas-venta">
        
          <div className="datos-venta">
            <span className='span-modal'>Cantidad De Entradas</span>
            <input onChange={(e) => setentradasPedidas(e.target.value)} className='input-seller' type="number" min={1} />
          </div>
          <div className="datos-venta">
            <span className='span-modal'>Numero de Lote disponible: {nombreLote}</span>
          </div>
          
            
          <div className="datos-venta">

            <span className='span-modal'>Entradas disponibles del lote: {cantidadDeEntradas - entradasVendidas} </span>

          </div>


          <div className="datos-venta">

          <span className='span-modal'>Precio Entradas: {precioEntradas }</span>

            </div>
          <div className="datos-venta">

            <span className='span-modal'>Precio Total: {precioFinal}</span>

          </div>


          <div class="vender-footer">

            <button data-bs-toggle="modal" data-bs-target="#sellerModal" type="button" class="btn btn-primary boton-seller">Vender</button>


          </div>


<div class="modal fade" id="sellerModal" tabindex="-1" aria-labelledby="sellerModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    
    <form onSubmit={handleSubmit} class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="sellerModalLabel">
          Confirmar venta
          </h1>
      </div>
     
      <div class="modal-body">
         {error && error}
        <div className="modal-caja">
          <div className="modal-datos">
            <span className='span-moda'>Nombre Lote</span>
            <h2>{nombreLote}</h2>
          </div>
          <div className="modal-datos">
          <span className='span-moda'>Cantidad Entradas</span>
          <h2>{entradasPedidas * 1}</h2>
          </div>
          <div className="modal-datos">
          <span className='span-moda'>Precio Entrada</span>
          <h2>{precioEntradas}</h2>
          </div>
          <div className="modal-datos">
          <span className='span-moda'>Precio Final</span>
          <h2>{precioFinal}</h2>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Vender</button>
      </div>
    </form>
  </div>
</div>


    
        </div>


          }  
        </div>
      </div>
    </div>
  </div>
)
}
export default SellerHome