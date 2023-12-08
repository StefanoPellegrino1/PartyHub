/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import'./home.css'
import Modal from '../modal/Modal'
import { Link } from 'react-router-dom'
import supabase from '../../back/supabaseClient'

const Home = ({token}) => {
  const id = token.user.id
 console.log(id)

  const [error, setError] = useState(null)

 
  const [nombre, setNombreFiesta] = useState('')
  const [fecha, setFechaFiesta] = useState('')
  
  const [errorCreate, setErrorCreate] = useState(null)

const [codigo, setCodigo] = useState('')
const [buscando, setBuscando] = useState(false)
const [fiestaEncontrada, setFiestaEncontrada] = useState('')

const allParties =[]
 const [fiestasTodas, setFiestasTodas] = useState([])
 const [fiestasJoined, setFiestasJoined] = useState([])

const[existe, setExiste] = useState(false)

  useEffect(() => {
  const fetchAllParties = async () =>{

const { data: fiestasCreadasData, error: fiestasCreadasError } = await supabase
.from('fiesta')
.select('*')
.eq('id_user', id);

// Verificar si hay algún error al obtener las fiestas creadas por ti
if (fiestasCreadasError) {
console.error('Error al obtener fiestas creadas por ti:', fiestasCreadasError);
} else {
// Si no hay error, y se obtuvieron datos, proceder al siguiente paso
  setFiestasTodas(fiestasCreadasData)
  // Obtener el código de la fiesta actual basándote en tu ID
  const { data: partyData, error: partyError } = await supabase
    .from('joined_parties')
    .select('party_code')  // Asegúrate de cambiar esto al nombre correcto de la columna
    .eq('user_id', id);

    console.log(partyData)
  // Verificar si hay algún error al obtener el código de la fiesta actual
  if (partyError) {
    console.error('Error al obtener el código de la fiesta:', partyError);
  } else {
    // Si no hay error, y se obtuvieron datos, proceder al siguiente paso
    if (partyData && partyData.length > 0) {
      const partyCodes = partyData.map(item => item.party_code);
     console.log(partyCodes)

      const { data: joinedPartiesData, error: joinedPartiesError } = await supabase
        .from('fiesta')
        .select('*')
        .in('codigo', partyCodes);



   console.log(joinedPartiesData)
      // Verificar si hay algún error al obtener datos adicionales de la fiesta
      if (joinedPartiesError) {
        console.error('Error al obtener datos adicionales de la fiesta:', joinedPartiesError);
      } else {
        // Trabajar con los datos obtenidos de ambas consultas
     

         setFiestasJoined(joinedPartiesData)

      }
              
       console.log(joinedPartiesData)
    }
  }


}

  
  // termina

  }

  fetchAllParties()

  }, [])

  const handleSubmit = async (e) => {
  e.preventDefault()
     

    if(!nombre || !fecha){
      setErrorCreate('Completa todos los campos')
      return
    }


    const agregarFiesta = async () => {
    
    let codigo = '';
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let charLength = chars.length;
    
    for ( let i = 0; i < 14; i++ ) {
       codigo += chars.charAt(Math.floor(Math.random() * charLength));
    }
 

    const {data, error} = await supabase
    .from('fiesta')
    .insert([{nombre: nombre, id_user:id ,codigo: codigo, fecha: fecha}])
    

  if(error){
    setErrorCreate('No fiesta')
    console.log(error)
    
  }
  if(data){
   
    setErrorCreate(null)   
  }
    }
    agregarFiesta()
 
  }

  
const buscarFiesta = async () => {
  
  if(!codigo ){
    setError('Completar campo')
    return
  }
  setBuscando(true)
  const {data, error} = await supabase
  .from('fiesta') 
  .select()
  .eq('codigo', codigo)
 
  if(error){
    throw error
  }

  if (data == "") {
    
    setFiestaEncontrada("No existe la fiesta")
    console.log(data) 
  }else{
     setExiste(true)
    setFiestaEncontrada(data[0].nombre)
   
   
  }

  
 }
 
 const joinParty = async () => {

  const {data, error} = await supabase
  .from('joined_parties')
  .insert([{user_id:id, party_code: codigo}])
 }

 const tocaFiesta =(c) => {
   
 }
 console.log(fiestasTodas)


        fiestasTodas.map((fiesta) => {
        
          allParties.unshift(fiesta);
          
        });
       fiestasJoined.map((fiesta) => { 
         fiesta.role = 'Seller'
          allParties.unshift(fiesta);
        });
        

//  let n = 0
// while (allParties.length === 0 ) {
 
 
//   return(
//     <div >
//         <div className='caja-grande'>
//             <div className="caja-mediana">
//                 <div className="titulo">
//                     <div className="titulo-parties">
//                         YOUR PARTIES
//                     </div>
//                     <div className="boton-acciones">
//                     <div class="dropdown">
//   <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//     Actions
//   </button>
//   <ul class="dropdown-menu">
//     <li><button  type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createModal">Create Party</button></li>



//     <li><button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#joinPartyModal">Join Party</button></li>
    
//   </ul>
// </div>
                     
                    
//                     </div>
                    
//                 </div>
//                 <h1>Loading...</h1>
//             </div>
//         </div>
//     </div>
//   )
// }
  return (
    <div >
        <div className='caja-grande'>
            <div className="caja-mediana">
                <div className="titulo">
                    <div className="titulo-parties">
                        YOUR PARTIES
                    </div>
                    <div className="boton-acciones">
                    <div class="dropdown">

</div>
                    <div class="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Actions
  </button>
  <ul className="dropdown-menu">
    <li><button  type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createModal">Create Party</button></li>
    <li><button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#joinPartyModal">Join Party</button></li>
    
  </ul>
</div>
                     
                    </div>
                    
                </div>
                <div className="parties"> 
             {allParties && allParties.map((f)=>(
                
            <div onClick={() => tocaFiesta(f.codigo)} className="party">
                      <Link to={f.role == 'Seller'? `/seller/ `+ f.codigo: `/dashboard/fiesta/ `+ f.codigo } className='link'>
                        <div className="adentro-party">
                            <div className="nombre-fiesta">
                                {f.nombre}
                            </div>
                            <div className="fecha-fiesta margin-fiesta">
                               {f.fecha}
                            </div>
 
                            <div className="cantidad-personas margin-fiesta">
                                Role: {f.role}
                            </div>
                            <div className="boton-fiesta">
                                <button className='btn  color'>Eliminar</button>
                            </div>
                        </div>
                        </Link>
                    </div>
                )
              )} 

               
                
        
                  
    {/* CREATE PARTY MODAL */}

    <div>
        <div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <form onSubmit={handleSubmit} class=" modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="createModalLabel">CREATE YOUR PARTY</h1>
        
      </div>
      <div class="modal-body">
      <div class="modal-body">
         {errorCreate && errorCreate}
        <div className="modal-caja">
          <div className="modal-datos">
            <span className='span-moda'>Nombre Fiesta</span>
            <input onChange={(e) => setNombreFiesta(e.target.value)} className='input-modal' type="text" />
          </div>
          <div className="modal-datos">
          <span className='span-moda'>Fecha de fiesta</span>
              <input onChange={(e) => setFechaFiesta(e.target.value)}  className='input-modal' type="text" />
          </div>

        </div>
      </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" >Save changes</button>
      </div>
    </form>
  </div>
</div>
    </div>
{/* JOIN PARTY MODAL */}

<div  class="modal fade" id="joinPartyModal" tabindex="-1" aria-labelledby="joinPartyModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="joinPartyModalLabel">JOIN A PARTY</h1>
        
      </div>
      { !buscando ? 
       
           <div>
        <div class="modal-body">
         <div className="join-modal">
          {error && error}
             <span className='span-modal'>ENTER PARTY CODE:</span>
            <input onChange={(e) => setCodigo(e.target.value)} type="text" />
         </div>
         <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={()=>buscarFiesta()} class="btn btn-primary">Search Party</button>
      </div>
      </div>
           </div>
        
         
        : 
        
         <div>
        <div class="modal-body">
         <div className="join-modal">
             <span className='span-modal'>PARTY:</span>
              <div className="party-to-join">{fiestaEncontrada} </div>
             <div class="modal-footer">
           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{setBuscando(false); setError(null)}}>Close</button>
             <button type="button" onClick={joinParty} class="btn btn-primary">Join Party</button>
      </div>
         </div>
      </div>
        </div> 
  }


    </div>
  </div>
</div>
                </div>
            </div>
        </div>
    </div>
  )

}

export default Home