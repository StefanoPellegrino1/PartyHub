import { useState } from 'react';

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    // Simula una operación asíncrona (reemplaza con tu lógica de envío a la base de datos)
    setTimeout(() => {
      setLoading(false);
      onSubmit();
      onClose();
    }, 2000); // Simula una demora de 2 segundos
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>Contenido del Modal</h2>
        {/* Contenido del modal */}
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar Info'}
        </button>
        <button onClick={onClose}>Cerrar Modal</button>
      </div>
    </div>
  );
};



export default Modal;
