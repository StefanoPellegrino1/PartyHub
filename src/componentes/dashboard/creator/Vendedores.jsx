import React, { useEffect, useState } from 'react'
import supabase from '../../../back/supabaseClient';
import { useParams } from 'react-router-dom';

const Vendedores = ({token}) => {

 const {id} = useParams()

  const iD = id.substr(1)
  console.log(iD)

  const [fiestaFetch, setFiestaFetch] = useState([])
  const [entradasVendidas, setEntradasVendidas] = useState([])

  const [datos, setDatos] = useState([{
    nombre: '',
    entradas: ''
  }])

  console.log(datos)
  useEffect(()=>{

    

    const fiesta = async () =>{
      const { data:partyData, error } = await supabase
      .from('joined_parties')
      .select('*') 
      .eq('party_code', iD)
     
      
      const partyCodes = partyData.map(item => item.user_id);
      const entradasVendidasVendedor = partyData.map(item => item.entradas_vendidas)

      


       const { data:joinedPartiesData, error: joinedPartiesError } = await supabase
         .from('Usuarios')
         .select('*')
         .in('id_unico', partyCodes);
 
  console.log(joinedPartiesData)
     
    if(error){
      
      console.log(error)
      
    }
    if(joinedPartiesData == ""){
      
       
      console.log('error')
    }else{
      setFiestaFetch(joinedPartiesData )
      setEntradasVendidas(entradasVendidasVendedor)
      console.log(joinedPartiesData)
      joinedPartiesData.map(n =>{
        setDatos({nombre: n.nombreYapellido})
      })
      entradasVendidasVendedor.map(n =>{
        setDatos({entradas: n.entradas_vendidas})
      })
    }
      }
      fiesta()
    }, [])
   
       let mirarGuardado = [1,2,3,4];
   
     const [currentPage, setCurrentPage] = useState(1)
     const recordsPerPage = 5
     const lastIndex = currentPage * recordsPerPage
     const firstIndex = lastIndex - recordsPerPage
     const records = mirarGuardado.slice(firstIndex, lastIndex)
     const nPage = Math.ceil(mirarGuardado.length / recordsPerPage)
     const numbers = [...Array(nPage + 1).keys()].slice(1)
     let result = '';
    
    function genRandonString() {
       let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
       let charLength = chars.length;
       
       for ( let i = 0; i < 20; i++ ) {
          result += chars.charAt(Math.floor(Math.random() * charLength));
       }
       return result;
    }
    
    
      console.log(fiestaFetch)
     
     return (
       <div className='table-padre mt-4'>
         <div className='table-hijo'>
          <div className='d-flex justify-content-center'>
                 <h2>VENDEDORES</h2>
          </div>
          <div className='d-flex justify-content-center'>
            <div className=''>
           <table className='table items '> 
           

           
               <thead >
                 <tr> 
                  <th>
                       N
                   </th>
                   <th>
                       Nombre 
                   </th>
   
                   <th>
                       Entradas Vendidas
                   </th>  
    
                 </tr>
               </thead>
              <tbody>
          { fiestaFetch.map((item, index)=>{
             genRandonString();
             console.log(entradasVendidas)
             let s = [1,23]
            return(
           
               <tr key = {index}>
                     <td>{index +1}</td> 
                     <td >{item.nombreYapellido}</td>
                    <td>
                        0
                    </td>
               </tr>  
           )}
          
           )}
     
         </tbody>   
           </table>
          
           <nav>
             <ul className='pagination'>
                 <li className='page-item'>
                   <div className='page-link' onClick={prePage}>Prev</div>
                 </li>
   
                 {
                   numbers.map((n, i)=>{
                     
                   return  <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                     
                       <div  className='page-link' onClick={()=>changeCPage(n)} >{n}</div>
                     </li>
                   })
                 }
   
                 <li className='page-item'>
                   <div  className='page-link' onClick={nextPage}>Next</div>
                 </li>
   
             </ul>
           </nav>
           </div> 
           </div>
          </div>
       </div>
     )
     function prePage(){
       if(currentPage !== 1){
         setCurrentPage(currentPage - 1)
       }
     }
   
     function changeCPage(id){
       setCurrentPage(id)
     }
     
     function nextPage(){
       if(currentPage !== nPage){
         setCurrentPage(currentPage + 1)
       }
     }
}

export default Vendedores