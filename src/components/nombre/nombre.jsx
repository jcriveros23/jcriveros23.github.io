import { useEffect } from "react";
import { useState } from "react";
import React from "react";
import "./nombre.css"
const Nombre = () => {
    const [showName, setShowName] = useState(true);

    // Ocultar el nombre después de 3 segundos (3000 milisegundos)
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowName(false);
      }, 10000);
  
      // Limpia el temporizador al desmontar el componente
      return () => clearTimeout(timer);
    }, []);
    return (
        <div className="container">
        {showName && <h1 className="big-name">Juan Camilo Riveros Pinzón</h1>}
      </div>
    )
}

export default Nombre;