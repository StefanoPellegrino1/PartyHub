import React, { useEffect, useState } from 'react'
import supabase from '../../back/supabaseClient'
import { useParams } from 'react-router-dom'

const VenderEntrada = () => {
  const {id} = useParams()
  const iD = id.substr(1)

  const [lote, setLote] = useState([])
  const [error, setError] = useState(null)
  const [entradasVendidas, setEntradasVendidas] = useState(0)
  const [entradasActual, setEntradasActual] = useState(0)
  const [preciosActual, setPreciosActual] = useState(0)
  const [recaudacionActual, setRecaudacionActual] = useState(0)
  const [nombreLote, setNombreLote] = useState('')
  const [estadoLote, setEstadoLote] = useState('')
  const [cantidadEntradas, setCantidadEntradas] = useState(0)
  

  const [loteActual, setLoteActual] = useState()

  let precioFinal = preciosActual * entradasVendidas;
  let entradasDisponibles = cantidadEntradas - entradasActual 

  const [masChico, setMasChico] = useState(0)
  let arrayLote = [1000]
  useEffect(() =>{

    const fetchAllLote = async () =>{
      const {data, error} = await supabase
      .from('Lote')
      .select('*')
      .eq('codigo_fiesta', iD)
      .eq('entradasVendidas', 0)

    if(error){
      setError('No hay lotees')
      console.log(error)
      setLote(null)
    }else{
       setLote(data)
       
       data.map(l=>{
        if (l.estado_lote === "Deshabilitado") {
          arrayLote.push(l.id)

        }else{
          console.log('p')
        }
       })
       setMasChico(Math.min(...arrayLote))
               
      setError(null)   
      
    }

    
} 
  fetchAllLote()



    const fetchLote = async () =>{

      const {data, error} = await supabase
      .from('Lote')
      .select('*')
      .eq('codigo_fiesta', iD)
      .eq("estado_lote", 'Habilitado')


    if(error){
      setError('No hay lotes')
      console.log(error)
      setLote(null)
    }else{
      setLoteActual(data)
       data.map(e =>{
        setEntradasActual(e.entradasVendidas)
        setNombreLote(e.nombreLote)
        setPreciosActual(e.precioEntrada)
        setRecaudacionActual(e.recudacion_lote)
        setEstadoLote(e.estado_lote)
        setCantidadEntradas(e.cantidadEntradas)
       })
       console.log(entradasActual)

      setError(null)   
    }
   
    
} 
  fetchLote()


  }, [])

  
 
  const updateEntradas = async () =>{

  let entradasTotales = parseInt(entradasVendidas) + parseInt(entradasActual)
  let recaudacionTotal = parseInt(recaudacionActual+ 0) + parseInt(precioFinal)

   if (entradasTotales > cantidadEntradas){
        setError('No hay entradas  suficientes en este lote')
        return
    }
 console.log(recaudacionActual + 0)

 console.log(masChico)
 
  const { data, error } = await supabase
  .from('Lote')
  .update({ entradasVendidas: entradasTotales})
  .eq('codigo_fiesta', iD)
  .eq("estado_lote", 'Habilitado')
  .select()

  const { data1, error1 } = await supabase
  .from('Lote')
  .update({ recudacion_lote: recaudacionTotal})
  .eq('codigo_fiesta', iD)
  .eq("estado_lote", 'Habilitado')
  .select()

  const { data2, error2 } = await supabase
  .from('Lote')
  .update({ estado_lote: 'Deshabilitado'})
  .eq('codigo_fiesta', iD)
  .eq("estado_lote", 'Habilitado')
  .gte('entradasVendidas', cantidadEntradas)
  .select()

  if (lote.length > 0) {
      const { data23, error23 } = await supabase
  .from('Lote')
  .update({ estado_lote: 'Habilitado'})
  .eq('id', masChico)
  .eq("estado_lote", 'Deshabilitado')
  .select()
  }else{
    console.log('banca')
  }

  }

  return (
<div  class="modal fade" id="sellPartyModal" tabindex="-1" aria-labelledby="sellPartyModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="sellPartyModalLabel">Vender Entrada</h1>
        
      </div>
     
       
           <div>
        <div class="modal-body">
         <div className="join-modal">
          {error && error}
             <span className='span-modal'>Cantidad De Entradas</span>
            <input onChange={(e) => setEntradasVendidas(e.target.value)}  type="number" min={1} />
         </div>
         <div className="join-modal">
          
          <span className='span-modal'>Numero de Lote disponible</span>
             {nombreLote }
      </div>
      <div className="join-modal">
          
          <span className='span-modal'>Entradas disponibles del lote</span>
             {entradasDisponibles}
      </div>
      <div className="join-modal">
          
          <span className='span-modal'>Precio Total</span>
            {precioFinal}
      </div>
         <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={updateEntradas} class="btn btn-primary">Vender</button>
      </div>
      </div>
           </div>
  


    </div>
  </div>
</div>
  )
}

export default VenderEntrada