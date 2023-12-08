import React from 'react'

const EditLote = () => {


  
  return (
    <div>
        
<div class="modal fade" id="editLoteModal" tabindex="-1" aria-labelledby="editLoteModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="editLoteModalLabel">Edit Lote</h1>
        
      </div>
      <div class="modal-body">
         <div className="join-modal">
         <div className="modal-datos">
            <span className='span-moda'>Nombre Lote</span>
            <input className='input-modal' type="text" />
          </div>
          <div className="modal-datos">
          <span className='span-moda'>Cantidad Entradas</span>
              <input className='input-modal' type="number" min="1"/>
          </div>
          <div className="modal-datos">
          <span className='span-moda'>Precio Entrada</span>
              <input className='input-modal' type="number" min="1"/>
          </div>
          <div className="modal-datos">
          <span className='span-moda'>Estado Lote</span>
          <select name="id">
            <option value="<?=$r->CID?>">Habilitado</option>
            <option value="<?=$r->CID?>">Deshabilitado</option>
          </select>
          </div>
          
         </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default EditLote