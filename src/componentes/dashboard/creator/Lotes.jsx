import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EditLote from "./EditLote";
import supabase from "../../../back/supabaseClient";

import { useMediaQuery } from "react-responsive";

const Lotes = () => {
  const { id } = useParams();
  const codigo_fiesta = id.substr(1);

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [nombreLote, setNombreLote] = useState("");
  const [cantidadEntradas, setCantidadEntradas] = useState("");
  const [precioEntrada, setPrecioEntrada] = useState("");
  const [errorLote, setErrorLote] = useState(null);
  const [loteHabilitados, setLoteHabilitado] = useState(false);

  const [error, setError] = useState(null);
  const [lote, setLote] = useState(null);

  useEffect(() => {
    const fetchLote = async () => {
      const { data, error } = await supabase
        .from("Lote")
        .select("*")
        .eq("codigo_fiesta", codigo_fiesta);

      if (error) {
        setError("No hay lotes");
        console.log(error);
        setLote(null);
      } else {
        setLote(data);

        data.map((l) => {
          if (l.estado_lote === "Habilitado") {
            setLoteHabilitado(true);
          }
        });
        setError(null);
      }
    };
    fetchLote();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombreLote || !precioEntrada || !cantidadEntradas) {
      setErrorLote("Completa todos los campos");
      return;
    }

    const agregarLote = async () => {
      if (lote.length === 0 || !loteHabilitados) {
        const { data, error } = await supabase
          .from("Lote")
          .insert([
            {
              nombreLote,
              precioEntrada,
              cantidadEntradas,
              codigo_fiesta,
              estado_lote: "Habilitado",
            },
          ]);

        if (error) {
          setErrorLote("Completa todos los campos");
          console.log(error);
        }
        if (data) {
          setErrorLote(null);
          console.log(data);
        }
      } else {
        const { data, error } = await supabase
          .from("Lote")
          .insert([
            {
              nombreLote,
              precioEntrada,
              cantidadEntradas,
              codigo_fiesta,
              estado_lote: "Deshabilitado",
            },
          ]);

        if (error) {
          setErrorLote("Completa todos los campos");
          console.log(error);
        }
        if (data) {
          setErrorLote(null);
          console.log(data);
        }
      }
    };
    agregarLote();
    window.location.replace('')
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>LOTES</h3>
      </div>
      <button
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        className="btn btn-success"
      >
        Agregar Lote
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <form onSubmit={handleSubmit} class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Agregar lote
              </h1>
            </div>

            <div class="modal-body">
              {errorLote && errorLote}
              <div className="modal-caja">
                <div className="modal-datos">
                  <span className="span-moda">Nombre Lote</span>
                  <input
                    onChange={(e) => setNombreLote(e.target.value)}
                    className="input-modal"
                    type="text"
                  />
                </div>
                <div className="modal-datos">
                  <span className="span-moda">Cantidad Entradas</span>
                  <input
                    onChange={(e) => setCantidadEntradas(e.target.value)}
                    className="input-modal"
                    type="number"
                    min="1"
                  />
                </div>
                <div className="modal-datos">
                  <span className="span-moda">Precio Entrada</span>
                  <input
                    onChange={(e) => setPrecioEntrada(e.target.value)}
                    className="input-modal"
                    type="number"
                    min="1"
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-3">
        {isMobile ? (

          <div>
            {lote &&
                lote.map((e, index) => (
               <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle r" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                 <h3> {e.nombreLote}  </h3>
                 <h8>{e.estado_lote} </h8>
                </button>
                <ul class="dropdown-menu s">
                  <li className="li">Entradas Totales: {e.cantidadEntradas}</li>
                  <li className="li">Cantidad Vendidas: {e.entradasVendidas}</li>
                  <li className="li">Precio entrada: {e.precioEntrada}</li>
                  <li className="li">Recaudado: {e.recudacion_lote}</li>
                  <div className="acciones-drop">     
                   
                     <button
                        type="button"
                        class="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target="#editLoteModal"
                        className="btn btn-info btn-sm me-2 b"
                      >
                        Edit
                      </button>
                    
                  
                  <Link className="btn btn-danger btn-sm b">Delete</Link>
                  
                </div>
                </ul>
              </div>
                ))}

          </div> 
          
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Numero Lote</th>
                <th>Nombre Lote</th>
                <th>Entradas totales</th>
                <th>Entradas vendidas</th>
                <th>Precio entrada</th>
                <th>Recaudado</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {lote &&
                lote.map((e, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{e.nombreLote}</td>
                    <td>{e.cantidadEntradas}</td>
                    <td>{e.entradasVendidas}</td>
                    <td>{e.precioEntrada}</td>
                    <td>{e.recudacion_lote}</td>
                    <td>{e.estado_lote}</td>

                    <td>
                      <button
                        type="button"
                        class="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target="#editLoteModal"
                        className="btn btn-info btn-sm me-2"
                      >
                        Edit
                      </button>
                      <Link className="btn btn-danger btn-sm">Delete</Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      <EditLote />
    </div>
  );
};

export default Lotes;
